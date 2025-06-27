const fs = require('fs');
const path = require('path');

class TripScanner {
  constructor(tripsDirectory = './trip-itineraries') {
    this.tripsDirectory = tripsDirectory;
    this.dataFile = path.join(this.tripsDirectory, 'trip-data.js');
    this.indexFile = path.join(this.tripsDirectory, 'index.html');
  }

  scanTrips() {
    const trips = [];
    if (!fs.existsSync(this.tripsDirectory)) {
      return trips;
    }

    const yearDirs = fs.readdirSync(this.tripsDirectory, { withFileTypes: true });
    for (const yearDir of yearDirs) {
      if (!yearDir.isDirectory() || yearDir.name === 'assets') continue;
      const yearPath = path.join(this.tripsDirectory, yearDir.name);
      const tripDirs = fs.readdirSync(yearPath, { withFileTypes: true });
      for (const tripDir of tripDirs) {
        if (!tripDir.isDirectory()) continue;
        const tripPath = path.join(yearPath, tripDir.name);
        const htmlPath = path.join(tripPath, 'index.html');
        if (!fs.existsSync(htmlPath)) continue;
        try {
          const html = fs.readFileSync(htmlPath, 'utf8');

          const titleMatch = html.match(/<h1[^>]*>([^<]+)<\/h1>/i) || html.match(/<title>([^<]+)<\/title>/i);
          const descMatch = html.match(/<h1[^>]*>[^<]*<\/h1>\s*<p[^>]*>([^<]+)<\/p>/i);
          const title = titleMatch ? titleMatch[1].trim() : tripDir.name;
          const description = descMatch ? descMatch[1].trim() : '';

          const startMatches = [];
          const endMatches = [];
          const regex = /start:\s*'([0-9]{8}T[0-9]{6})'[^\n]*?end:\s*'([0-9]{8}T[0-9]{6})'/g;
          let m;
          while ((m = regex.exec(html)) !== null) {
            startMatches.push(m[1]);
            endMatches.push(m[2]);
          }
          let startDate = '';
          let endDate = '';
          if (startMatches.length) {
            startMatches.sort();
            endMatches.sort();
            startDate = startMatches[0].slice(0, 8).replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
            endDate = endMatches[endMatches.length - 1].slice(0, 8).replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
          }

          const relativePath = path.relative(this.tripsDirectory, htmlPath).replace(/\\/g, '/');
          trips.push({ title, description, date: startDate, endDate, path: relativePath });
        } catch (err) {
          // Ignore parsing errors
        }
      }
    }
    return trips;
  }

  generateTripDataFile(trips = null) {
    if (!trips) {
      trips = this.scanTrips();
    }
    const content = 'const TRIPS_DATA = ' + JSON.stringify(trips, null, 2) + ';\n';
    fs.writeFileSync(this.dataFile, content, 'utf8');
  }

  updateIndexHTML() {
    if (!fs.existsSync(this.indexFile)) return;
    let html = fs.readFileSync(this.indexFile, 'utf8');
    if (!html.includes('trip-data.js')) {
      html = html.replace('</head>', '    <script src="trip-data.js"></script>\n</head>');
      fs.writeFileSync(this.indexFile, html, 'utf8');
    }
  }
}

module.exports = TripScanner;

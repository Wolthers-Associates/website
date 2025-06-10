// git-updater.js - Enhanced trip scanner with Git integration
const { exec } = require('child_process');
const util = require('util');
const execAsync = util.promisify(exec);
const TripScanner = require('./trip-scanner');

class GitTripUpdater extends TripScanner {
    constructor(tripsDirectory = './trips', gitBranch = 'main') {
        super(tripsDirectory);
        this.gitBranch = gitBranch;
        this.commitMessage = `Auto-update trips - ${new Date().toISOString().split('T')[0]}`;
    }

    async checkGitStatus() {
        try {
            await execAsync('git --version');
            const { stdout } = await execAsync('git status --porcelain');
            return {
                isGitRepo: true,
                hasChanges: stdout.trim().length > 0,
                changes: stdout.trim()
            };
        } catch (error) {
            console.log('Git not available or not a git repository');
            return { isGitRepo: false, hasChanges: false };
        }
    }

    async pullLatestChanges() {
        try {
            console.log('Pulling latest changes from remote...');
            const { stdout, stderr } = await execAsync(`git pull origin ${this.gitBranch}`);
            console.log('Pull result:', stdout);
            if (stderr) console.warn('Pull warnings:', stderr);
            return true;
        } catch (error) {
            console.error('Error pulling changes:', error.message);
            return false;
        }
    }

    async commitAndPush() {
        try {
            const gitStatus = await this.checkGitStatus();
            
            if (!gitStatus.isGitRepo) {
                console.log('Not a git repository - skipping git operations');
                return false;
            }

            if (!gitStatus.hasChanges) {
                console.log('No changes to commit');
                return true;
            }

            console.log('Changes detected:', gitStatus.changes);

            // Add all changes
            console.log('Adding changes...');
            await execAsync('git add .');

            // Commit changes
            console.log('Committing changes...');
            await execAsync(`git commit -m "${this.commitMessage}"`);

            // Push to remote
            console.log('Pushing to remote...');
            const { stdout, stderr } = await execAsync(`git push origin ${this.gitBranch}`);
            console.log('Push result:', stdout);
            if (stderr) console.warn('Push warnings:', stderr);

            console.log('✅ Successfully committed and pushed changes');
            return true;

        } catch (error) {
            console.error('❌ Error in git operations:', error.message);
            return false;
        }
    }

    async fullUpdate() {
        console.log('🚀 Starting full trip update with Git integration...');
        console.log(`Time: ${new Date().toISOString()}`);
        
        try {
            // 1. Pull latest changes first
            await this.pullLatestChanges();

            // 2. Scan trips and update files
            console.log('📁 Scanning trip directories...');
            const trips = await this.scanTrips();
            
            if (trips.length === 0) {
                console.log('⚠️  No trips found');
                return false;
            }

            console.log(`📋 Found ${trips.length} trips`);

            // 3. Generate updated files
            console.log('📝 Generating trip data file...');
            this.generateTripDataFile();

            console.log('🔄 Updating index.html...');
            this.updateIndexHTML();

            // 4. Commit and push changes
            console.log('📤 Committing to Git...');
            const gitSuccess = await this.commitAndPush();

            if (gitSuccess) {
                console.log('✅ Trip update completed successfully!');
                
                // 5. Print summary
                this.printUpdateSummary(trips);
                return true;
            } else {
                console.log('⚠️  Trip update completed but Git operations failed');
                return false;
            }

        } catch (error) {
            console.error('❌ Error during update:', error);
            return false;
        }
    }

    printUpdateSummary(trips) {
        console.log('\n📊 === UPDATE SUMMARY ===');
        console.log(`🕐 Update time: ${new Date().toLocaleString()}`);
        console.log(`📁 Total trips: ${trips.length}`);
        
        const now = new Date();
        const upcoming = trips.filter(t => new Date(t.endDate) >= now);
        const past = trips.filter(t => new Date(t.endDate) < now);
        
        console.log(`🔜 Upcoming trips: ${upcoming.length}`);
        console.log(`✅ Past trips: ${past.length}`);
        
        console.log('\n📋 All trips:');
        trips.forEach(trip => {
            const status = new Date(trip.endDate) >= now ? '🔜' : '✅';
            console.log(`   ${status} ${trip.title} (${trip.date} to ${trip.endDate})`);
        });
        
        console.log('\n🎯 Files updated:');
        console.log('   📄 trip-data.js');
        console.log('   🏠 index.html');
        console.log('========================\n');
    }
}

// Scheduler integration
const cron = require('node-cron');

class TripScheduler {
    constructor(updater) {
        this.updater = updater;
        this.isRunning = false;
    }

    start(schedule = '0 8 * * *', timezone = 'America/Sao_Paulo') {
        console.log(`📅 Trip scheduler started`);
        console.log(`⏰ Schedule: Daily at 8:00 AM (${timezone})`);
        console.log(`📂 Watching: ${this.updater.tripsDirectory}`);
        
        cron.schedule(schedule, async () => {
            if (this.isRunning) {
                console.log('⚠️  Update already running, skipping...');
                return;
            }

            this.isRunning = true;
            console.log('\n🔔 Scheduled update triggered');
            
            try {
                await this.updater.fullUpdate();
            } catch (error) {
                console.error('❌ Scheduled update failed:', error);
            } finally {
                this.isRunning = false;
            }
        }, {
            scheduled: true,
            timezone: timezone
        });

        // Also run immediately if requested
        if (process.argv.includes('--now')) {
            console.log('🚀 Running immediate update...');
            this.runNow();
        }
    }

    async runNow() {
        if (this.isRunning) {
            console.log('⚠️  Update already running');
            return;
        }

        this.isRunning = true;
        try {
            await this.updater.fullUpdate();
        } finally {
            this.isRunning = false;
        }
    }
}

// CLI usage
if (require.main === module) {
    const updater = new GitTripUpdater();
    
    if (process.argv.includes('--schedule')) {
        // Run as scheduler
        const scheduler = new TripScheduler(updater);
        scheduler.start();
        
        console.log('🎯 Use Ctrl+C to stop the scheduler');
        
        // Graceful shutdown
        process.on('SIGINT', () => {
            console.log('\n👋 Shutting down scheduler...');
            process.exit(0);
        });
        
    } else {
        // Run once
        updater.fullUpdate().then(success => {
            process.exit(success ? 0 : 1);
        });
    }
}

module.exports = { GitTripUpdater, TripScheduler };

// package.json scripts section:
/*
{
  "scripts": {
    "update-trips": "node git-updater.js",
    "update-now": "node git-updater.js --now",
    "start-scheduler": "node git-updater.js --schedule",
    "setup-git": "git init && git remote add origin YOUR_REPO_URL"
  },
  "dependencies": {
    "node-cron": "^3.0.3"
  }
}
*/
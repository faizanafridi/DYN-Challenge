module.exports = function(config) {
    config.set({
      // other configurations...
  
      browsers: ['ChromeHeadless'], // Use Chrome in headless mode
  
      customLaunchers: {
        ChromeHeadlessCI: {
          base: 'ChromeHeadless',
          flags: ['--no-sandbox', '--disable-gpu']
        }
      },
  
      // Use the custom launcher in CI environments
      browsers: process.env.CI ? ['ChromeHeadlessCI'] : ['Chrome'],
    });
  };
  
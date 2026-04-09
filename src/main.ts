import * as core from '@actions/core';
import * as fs from 'fs/promises';

async function run() {
  try {
    const inputUrl = core.getInput('url') || 'https://traffictorch.net';
    const htmlPath = core.getInput('html_path');
    const toolsInput = core.getInput('tools').toLowerCase().trim();
    const openInBrowser = core.getInput('open_in_browser') !== 'false';

    const requestedTools = toolsInput === 'all' || !toolsInput 
      ? ['all'] 
      : toolsInput.split(',').map(t => t.trim());

    core.info(`🚀 Starting Traffic Torch SEO + UX + Design + AEO + GEO Audit`);

    let targetUrl = inputUrl;

    // HTML file mode - auto-read and encode for your site's HTML input
    if (htmlPath) {
      core.info(`📄 Reading HTML file: ${htmlPath}`);
      const htmlContent = await fs.readFile(htmlPath, 'utf-8');
      const encodedHtml = encodeURIComponent(htmlContent);
      targetUrl = `https://traffictorch.net/ai-audit-tool/?html=${encodedHtml}&tools=${requestedTools.join(',')}`;
      core.info(`✅ HTML file loaded and ready for full interactive experience`);
    } 
    // URL mode
    else {
      const encodedUrl = encodeURIComponent(inputUrl);
      targetUrl = `https://traffictorch.net/ai-audit-tool/?url=${encodedUrl}&tools=${requestedTools.join(',')}`;
    }

    core.info(`🔗 Full Traffic Torch audit link ready:`);
    core.info(targetUrl);

    if (openInBrowser) {
      core.info(`🌐 Click the link above to open in a new browser tab`);
      core.info(`You will see the full Traffic Torch experience:`);
      core.info(`• Rate limit popup`);
      core.info(`• Upgrade prompt`);
      core.info(`• Day/night mode (text-gray-800 / dark:text-gray-200)`);
      core.info(`• All deep-dive modules, AI fixes, educational content`);
    }

    // Beautiful Job Summary for GitHub UI
    core.summary
      .addHeading('🚀 Traffic Torch 360° Audit Complete')
      .addLink('🔗 Open Full Interactive Audit in Browser', targetUrl)
      .addRaw(`**Mode:** ${htmlPath ? 'Built HTML File' : 'Live URL'}<br>**Tools:** ${requestedTools.join(', ')}`)
      .write();

    core.setOutput('report-link', targetUrl);
    core.setOutput('health-score', 'N/A (view full report in browser)');

    core.info(`✅ Action completed successfully!`);
  } catch (error) {
    core.setFailed(`Action failed: ${(error as Error).message}`);
  }
}

run();
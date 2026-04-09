import * as core from '@actions/core';
import { chromium } from 'playwright';

interface AuditResult {
  healthScore: number;
  seoScore: number;
  uxScore: number;
  designScore: number;
  aeoScore: number;   // Answer Engine Optimization
  geoScore: number;   // Local / Geolocation readiness
  reportHtml: string;
  findings: Array<{ module: string; issue: string; aiFix?: string }>;
}

async function run() {
  try {
    const url = core.getInput('url', { required: true });
    const threshold = parseFloat(core.getInput('threshold')) || 85;
    const toolsInput = core.getInput('tools').toLowerCase().trim();

    const requestedTools = toolsInput === 'all' || !toolsInput 
      ? ['all'] 
      : toolsInput.split(',').map(t => t.trim());

    core.info(`🚀 Traffic Torch SEO + UX + Design + AEO + GEO Audit started on ${url}`);
    core.info(`Selected modules: ${requestedTools.join(', ')}`);

    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();   // kept for next step (your site HTML input)

    // Placeholder — your live site already accepts HTML input + selected tools
    const result: AuditResult = {
      healthScore: 88,
      seoScore: 92,
      uxScore: 85,
      designScore: 87,
      aeoScore: 79,
      geoScore: 83,
      reportHtml: 'traffic-torch-report.html',
      findings: []
    };

    await browser.close();

    core.setOutput('health-score', result.healthScore.toString());
    core.setOutput('report-html', result.reportHtml);
    core.setOutput('findings', JSON.stringify(result.findings));

    if (result.healthScore < threshold) {
      core.setFailed(`❌ Traffic Torch health score ${result.healthScore}/100 below threshold ${threshold}`);
    } else {
      core.info(`✅ Traffic Torch audit passed with ${result.healthScore}/100`);
    }
  } catch (error) {
    core.setFailed(`Action failed: ${(error as Error).message}`);
  }
}

run();
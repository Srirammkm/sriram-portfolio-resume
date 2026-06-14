import { refreshIcons } from '../icons.js';
import { showTourEndCta, hideTourEndCta } from '../hiring-ux.js';

const TOUR_STORAGE_KEY = 'lab-guided-tour-complete';

export function initGuidedTour(labApi) {
  const overlay = document.getElementById('lab-guided-tour');
  const stepLabel = document.getElementById('lab-tour-step-label');
  const titleEl = document.getElementById('lab-tour-title');
  const textEl = document.getElementById('lab-tour-text');
  const skipBtn = document.getElementById('lab-tour-skip');
  const nextBtn = document.getElementById('lab-tour-next');

  if (!overlay || !stepLabel || !titleEl || !textEl || !nextBtn) return;

  const steps = [
    {
      title: 'Interactive replicas of production systems',
      text: 'These demos mirror platforms I shipped in production, not mockups. You are safe: no real cloud is connected.',
      run: () => {
        labApi.switchTab('overview');
        hideTourEndCta();
      },
    },
    {
      title: 'NextOps: Slack-native self-service',
      text: 'Engineers run production operations from chat with live RBAC, Temporal workflows, and a full audit trail.',
      run: () => {
        labApi.switchTab('slackops');
        labApi.activateProductSubpane('slackops', 'try-live');
        labApi.switchSlackConsoleTab('slackops-dash');
      },
    },
    {
      title: 'Run a runbook action',
      text: 'Watch a catalog action execute with status tracking, the same pattern used for long-running prod workflows.',
      run: () => {
        labApi.switchTab('slackops');
        labApi.activateProductSubpane('slackops', 'try-live');
        labApi.switchSlackConsoleTab('slackops-services');
        setTimeout(() => {
          document.getElementById('slackops-running-trigger')?.click();
        }, 400);
      },
    },
    {
      title: 'This is what I build for teams',
      text: 'Less ticket queue. Safer change. Engineers get self-service without losing governance. Want this for your org?',
      run: () => {
        labApi.switchTab('slackops');
        labApi.activateProductSubpane('slackops', 'try-live');
        showTourEndCta();
      },
    },
  ];

  let stepIndex = 0;

  function renderStep() {
    const step = steps[stepIndex];
    stepLabel.textContent = `Step ${stepIndex + 1} of ${steps.length}`;
    titleEl.textContent = step.title;
    textEl.textContent = step.text;
    nextBtn.textContent = stepIndex === steps.length - 1 ? 'Done' : 'Next';
    step.run();
    refreshIcons();
  }

  function endTour(markComplete = true) {
    overlay.classList.add('hidden');
    if (markComplete) sessionStorage.setItem(TOUR_STORAGE_KEY, '1');
  }

  skipBtn?.addEventListener('click', () => endTour(true));

  nextBtn.addEventListener('click', () => {
    if (stepIndex >= steps.length - 1) {
      endTour(true);
      return;
    }
    stepIndex += 1;
    renderStep();
  });

  return {
    startIfNeeded() {
      if (sessionStorage.getItem(TOUR_STORAGE_KEY)) return;
      stepIndex = 0;
      overlay.classList.remove('hidden');
      renderStep();
    },
    resetForDemo() {
      sessionStorage.removeItem(TOUR_STORAGE_KEY);
    },
  };
}

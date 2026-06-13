import { refreshIcons } from '../icons.js';

export function initAutomationLab() {
  // === Fullscreen Immersive Mode Controller ===
  const fullscreenBtn = document.getElementById('lab-fullscreen-btn');
  const labContainer = document.getElementById('interactive-lab');

  const MOBILE_DEMO_MQ = window.matchMedia('(max-width: 768px)');

  function isMobileDemoDisabled() {
    return MOBILE_DEMO_MQ.matches;
  }

  function updateLaunchPlaygroundAvailability() {
    const disabled = isMobileDemoDisabled();
    if (launchPlaygroundBtn) {
      launchPlaygroundBtn.disabled = disabled;
      launchPlaygroundBtn.setAttribute('aria-disabled', disabled ? 'true' : 'false');
    }
    if (disabled && labContainer?.classList.contains('fullscreen-active')) {
      toggleFullscreen({ forceExit: true });
    }
  }

  function toggleFullscreen(options = {}) {
    if (!labContainer) return;
    const isCurrentlyFullscreen = labContainer.classList.contains('fullscreen-active');

    if (!isCurrentlyFullscreen && !options.forceExit && isMobileDemoDisabled()) {
      return;
    }
    
    if (isCurrentlyFullscreen) {
      labContainer.classList.remove('fullscreen-active');
      document.body.classList.remove('lab-fullscreen-open');
      if (fullscreenBtn) {
        fullscreenBtn.innerHTML = '<i data-lucide="maximize-2"></i> <span>Fullscreen Mode</span>';
      }
    } else {
      labContainer.classList.add('fullscreen-active');
      document.body.classList.add('lab-fullscreen-open');
      if (fullscreenBtn) {
        fullscreenBtn.innerHTML = '<i data-lucide="minimize-2"></i> <span>Exit Fullscreen</span>';
      }
    }
    refreshIcons();
    window.dispatchEvent(new Event('resize'));
  }

  fullscreenBtn?.addEventListener('click', toggleFullscreen);

  const launchPlaygroundBtn = document.getElementById('launch-playground-btn');
  launchPlaygroundBtn?.addEventListener('click', () => {
    if (isMobileDemoDisabled()) return;
    toggleFullscreen();
  });

  updateLaunchPlaygroundAvailability();
  MOBILE_DEMO_MQ.addEventListener('change', () => {
    updateLaunchPlaygroundAvailability();
    refreshIcons();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && labContainer?.classList.contains('fullscreen-active')) {
      toggleFullscreen();
    }
  });

  // === Navigation Engine ===
  const labNavItems = document.querySelectorAll('.lab-nav-item');
  const labPanes = document.querySelectorAll('.lab-pane');

  function switchTab(product) {
    // Update sidebar navigation
    labNavItems.forEach(item => {
      const active = item.getAttribute('data-product') === product;
      item.classList.toggle('active', active);
      item.setAttribute('aria-selected', active ? 'true' : 'false');
    });

    // Update active pane
    labPanes.forEach(pane => {
      const active = pane.getAttribute('id') === `pane-${product}`;
      pane.classList.toggle('active', active);
    });
  }

  labNavItems.forEach(item => {
    item.addEventListener('click', () => {
      const product = item.getAttribute('data-product');
      switchTab(product);
    });
  });

  // Overview cards → product tab
  const overviewNavTargets = document.querySelectorAll('.overview-card');
  overviewNavTargets.forEach(card => {
    card.addEventListener('click', () => {
      if (isMobileDemoDisabled()) return;
      const targetProduct = card.getAttribute('data-card-product');
      if (targetProduct) {
        switchTab(targetProduct);
      }
    });
  });

  // Sub-tabs switching inside each product
  const subtabButtons = document.querySelectorAll('.product-tab-btn');
  subtabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const pane = btn.closest('.lab-pane');
      const subtab = btn.getAttribute('data-subtab');
      
      // Update buttons
      pane.querySelectorAll('.product-tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Update subpanes
      pane.querySelectorAll('.product-subpane').forEach(sp => {
        const isTarget = sp.getAttribute('data-subpane-id') === subtab;
        sp.classList.toggle('active', isTarget);
      });
    });
  });

  // === NextOps Bot Happy Path ===
  const slackOpsFeed = document.getElementById('slackops-live-feed');
  const slackOpsHistory = document.getElementById('slackops-workflow-history-rows');

  // App home tab buttons inside native console or Slack
  const slackTabBtns = document.querySelectorAll('[data-slack-tab]');
  slackTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const shell = btn.closest('.console-playground-container') || btn.closest('.fake-slack-shell');
      if (!shell) return;
      const targetTab = btn.getAttribute('data-slack-tab');
      
      shell.querySelectorAll('[data-slack-tab]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      shell.querySelectorAll('.slack-content-pane').forEach(cp => {
        const isTarget = cp.getAttribute('id') === `slack-tab-${targetTab}`;
        cp.classList.toggle('active', isTarget);
      });
    });
  });

  function openModal(id) {
    const modal = document.getElementById(`modal-${id}`);
    if (modal) modal.classList.remove('hidden');
  }

  function closeModal(id) {
    const modal = document.getElementById(`modal-${id}`);
    if (modal) modal.classList.add('hidden');
  }

  // Open modals via triggers
  document.querySelectorAll('[data-action-trigger]').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const action = trigger.getAttribute('data-action-trigger');
      if (action === 'feature-toggle-btn') {
        switchTab('govportal');
        const govportalFormItem = document.getElementById('govportal-form-item');
        if (govportalFormItem) {
          govportalFormItem.value = 'toggle';
          govportalFormItem.dispatchEvent(new Event('change'));
        }
      } else {
        openModal(action);
      }
    });
  });

  document.getElementById('slackops-ops-req-btn')?.addEventListener('click', () => openModal('ops-request'));

  // Close buttons inside modals
  document.querySelectorAll('[data-close-modal]').forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
      const modalId = closeBtn.getAttribute('data-close-modal');
      closeModal(modalId);
    });
  });

  document.querySelectorAll('.slack-btn-modal-cancel').forEach(cancelBtn => {
    cancelBtn.addEventListener('click', () => {
      const modal = cancelBtn.closest('.slack-modal-overlay');
      if (modal) modal.classList.add('hidden');
    });
  });

  // NextOps Actions Logic
  function addWorkflowToHistory(type, duration) {
    const randId = Math.floor(1000 + Math.random() * 9000);
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>wf-${randId}</td>
      <td>${type}</td>
      <td><span class="status-badge complete">Complete</span></td>
      <td>${duration}</td>
      <td>Alex Rivera</td>
      <td>Just now</td>
    `;
    if (slackOpsHistory) {
      slackOpsHistory.insertBefore(row, slackOpsHistory.firstChild);
    }
  }

  function simulateSlackWorkflowCard(title, fields, logSteps) {
    const placeholder = slackOpsFeed.querySelector('.console-feed-placeholder');
    if (placeholder) placeholder.remove();

    const wfId = `wf-${Math.floor(1000 + Math.random() * 9000)}`;
    const card = document.createElement('div');
    card.className = 'slack-card nextops-exec-card';

    let fieldsHtml = '';
    fields.forEach(f => {
      fieldsHtml += `
        <div class="slack-card-field">
          <span class="slack-card-field-label">${f.label}</span>
          <span class="slack-card-field-val">${f.val}</span>
        </div>
      `;
    });

    const checklistItems = logSteps.map((step, i) =>
      `<li class="nextops-step-item" data-step="${i}"><span class="nextops-step-icon"></span><span>${step.log}</span></li>`
    ).join('');

    card.innerHTML = `
      <div class="slack-card-header">
        <i data-lucide="bolt" class="slack-card-icon" style="color:#4f46e5;"></i>
        <span class="slack-card-title-text">${title}</span>
        <span class="nextops-wf-id font-mono">${wfId}</span>
        <span class="status-pill status-pending">Pending</span>
      </div>
      <div class="slack-card-grid nextops-field-grid">
        ${fieldsHtml}
      </div>
      <ul class="nextops-step-list">${checklistItems}</ul>
      <div class="slack-progress-section">
        <span class="slack-progress-label">Progress: 0%</span>
        <div class="progress-bar-track">
          <div class="progress-bar-fill" style="width: 0%;"></div>
        </div>
      </div>
      <div class="slack-card-logs nextops-exec-logs">[00:00:00] Workflow worker initialized.</div>
      <div class="nextops-audit-note hidden" id="audit-${wfId}">
        <i data-lucide="clipboard-check"></i>
        <span>Logged to audit trail · operator Alex Rivera · demo mode</span>
      </div>
    `;

    slackOpsFeed.prepend(card);
    slackOpsFeed.scrollTop = 0;
    refreshIcons();

    const progressLabel = card.querySelector('.slack-progress-label');
    const progressFill = card.querySelector('.progress-bar-fill');
    const logsContainer = card.querySelector('.slack-card-logs');
    const statusPill = card.querySelector('.status-pill');
    const stepItems = card.querySelectorAll('.nextops-step-item');
    const auditNote = card.querySelector('.nextops-audit-note');

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < logSteps.length) {
        statusPill.textContent = 'In Progress';
        statusPill.className = 'status-pill status-executing';
        const step = logSteps[currentStep];
        const pct = step.progress;
        progressLabel.textContent = `Progress: ${pct}%`;
        progressFill.style.width = `${pct}%`;
        const stepEl = stepItems[currentStep];
        if (stepEl) stepEl.classList.add('done');
        logsContainer.innerHTML += `\n[00:00:${String(currentStep + 1).padStart(2, '0')}] ${step.log}`;
        logsContainer.scrollTop = logsContainer.scrollHeight;
        currentStep++;
      } else {
        statusPill.textContent = 'Complete';
        statusPill.className = 'status-pill status-completed';
        progressLabel.textContent = 'Progress: 100%';
        progressFill.style.width = '100%';
        logsContainer.innerHTML += `\n[00:00:0${logSteps.length + 1}] Workflow ${wfId} committed successfully.`;
        auditNote?.classList.remove('hidden');
        refreshIcons();
        clearInterval(interval);
        addWorkflowToHistory(title, '3.0s');
      }
    }, 1100);
  }

  const nextopsDateEl = document.getElementById('nextops-demo-date');
  if (nextopsDateEl) {
    nextopsDateEl.textContent = new Date().toLocaleDateString('en-US', {
      weekday: 'short', month: 'short', day: 'numeric', year: 'numeric'
    });
  }

  // Create Mongo User Form Submit
  document.getElementById('submit-create-mongo-user')?.addEventListener('click', () => {
    const pod = document.getElementById('form-mongo-pod').value;
    const jira = document.getElementById('form-mongo-jira').value;
    const org = document.getElementById('form-mongo-org').value;
    const hours = document.getElementById('form-mongo-hours').value;
    const type = document.getElementById('form-mongo-type').value;

    closeModal('create-mongo-user');
    
    simulateSlackWorkflowCard(
      'Create Mongo User',
      [
        { label: 'Target Pod', val: pod },
        { label: 'Jira Ticket', val: jira },
        { label: 'Org ID', val: org },
        { label: 'Validity Hours', val: `${hours} hours` },
        { label: 'Role Clearance', val: type }
      ],
      [
        { progress: 25, log: 'Validating inputs and RBAC clearance...' },
        { progress: 55, log: 'Verifying identity via Slack workspace token...' },
        { progress: 85, log: 'Provisioning Mongo user in target cluster...' },
        { progress: 100, log: 'Temporary credentials issued. Expiry timer started.' }
      ]
    );
  });

  // Terminate Stuck Job Submit
  document.getElementById('submit-terminate-job')?.addEventListener('click', () => {
    const pod = document.getElementById('form-term-pod').value;
    const org = document.getElementById('form-term-org').value;
    const jobid = document.getElementById('form-term-jobid').value;
    const caseRef = document.getElementById('form-term-case').value;

    closeModal('terminate-job');

    simulateSlackWorkflowCard(
      'Terminate Job',
      [
        { label: 'Target Pod', val: pod },
        { label: 'Org ID', val: org },
        { label: 'Job Instance', val: jobid },
        { label: 'Support Case #', val: caseRef }
      ],
      [
        { progress: 40, log: 'Locating hung database processes for Org ID...' },
        { progress: 75, log: 'Sending SIGTERM to active job coordinator processes...' },
        { progress: 100, log: 'Job successfully terminated. Thread locks released.' }
      ]
    );
  });

  // Ops Request On-call route Submit
  document.getElementById('submit-ops-request')?.addEventListener('click', () => {
    const link = document.getElementById('form-ops-jiralink').value;
    const sev = document.getElementById('form-ops-severity').value;
    const comp = document.getElementById('form-ops-component').value;

    closeModal('ops-request');

    simulateSlackWorkflowCard(
      'Route Ops Request',
      [
        { label: 'Jira Ref', val: link.substring(link.lastIndexOf('/') + 1) },
        { label: 'Severity Level', val: sev },
        { label: 'Component', val: comp }
      ],
      [
        { progress: 30, log: 'Parsing operational logs for component context...' },
        { progress: 65, log: 'Selecting best on-call staff in Active Shift (India)...' },
        { progress: 100, log: 'Incident details routed to Priya Nair. Alert acknowledged.' }
      ]
    );
  });

  // NextOps logs dataset
  const jobsLogs = [
    "[00:00:01] Querying cluster API namespaces for active workloads...",
    "[00:00:02] Found 3 active jobs running in production namespace:",
    "  - wf-governance-toggle-3829 (Status: RUNNING, Uptime: 45s)",
    "  - wf-sre-pod-monitor-2201 (Status: RUNNING, Uptime: 12h 4m)",
    "  - wf-rca-generator-rca-generator (Status: IDLE, Uptime: 3d)",
    "[00:00:03] Workloads list fetched successfully. End of stream."
  ];

  const ebfLogs = [
    "[00:00:01] Initializing Emergency Bug Fix (EBF) container rollover sequence...",
    "[00:00:02] Target namespace: cloudstack-prod-use2-auth-service",
    "[00:00:03] Deployment image tag set to: v2.4-stable-patch12",
    "[00:00:04] Deploying replicas (container active)...",
    "[00:00:05] [k8s] Pod auth-service-new-7fa82b created",
    "[00:00:06] [k8s] Container auth-service-new-7fa82b started & healthcheck passed",
    "[00:00:07] [k8s] Redirecting service selector routes to new replicas...",
    "[00:00:08] [k8s] Terminating old pod auth-service-old-2b81fa",
    "[00:00:09] EBF rolling deployment completed. 100% replicas verified stable."
  ];

  const dumpLogs = [
    "[00:00:01] Requesting JVM stack trace for active containers...",
    "[00:00:02] Connecting to pod cloudstack-prod-use2-auth-service-2b81fa...",
    "[00:00:03] Thread Dump Time: 2026-06-13 15:32:00",
    "[00:00:04] Found 142 active threads (118 RUNNABLE, 14 TIMED_WAITING, 10 BLOCKED).",
    "[00:00:05] Threads blocked awaiting database pool lock:",
    "  - \"http-nio-8080-exec-12\" #48 daemon prio=5 os_prio=0 tid=0x00007f82ac003800 nid=0x2c waiting on condition",
    "    java.lang.Thread.State: BLOCKED (on object monitor)",
    "    at com.zaxxer.hikari.pool.HikariPool.getConnection(HikariPool.java:182)",
    "    at org.hibernate.engine.jdbc.connections.internal.DatasourceConnectionProviderImpl.getConnection(DatasourceConnectionProviderImpl.java:122)",
    "[00:00:06] Thread dump analysis completed. Starved thread deadlock detected in connection pool."
  ];

  const lockLogs = [
    "[00:00:01] Scanning cloudstack-prod-mongo-use2 for transaction lock bottlenecks...",
    "[00:00:02] Active blocking transaction lock identified:",
    "  - Blocking PID: 14820 (Granted: true)",
    "  - Waiting PIDs: 14822, 14825, 14901",
    "  - Query: UPDATE organizations SET status = 'active' WHERE org_id = 'org-acme-8842';",
    "[00:00:03] Terminating blocking Postgres transaction PID 14820...",
    "[00:00:04] Executing database signal command: SELECT pg_terminate_backend(14820);",
    "[00:00:05] Database transaction lock successfully released. Blocked queue cleared."
  ];

  // Setup additional catalog service triggers
  document.getElementById('slackops-rca-trigger')?.addEventListener('click', () => {
    switchTab('rcagen');
    const tryLiveTab = document.querySelector('#pane-rcagen .product-tab-btn[data-subtab="try-live"]');
    tryLiveTab?.click();
    const heapBtn = document.querySelector('.opssage-process-btn[data-opssage-id="heap"]');
    if (heapBtn && !heapBtn.disabled) heapBtn.click();
  });

  document.getElementById('slackops-ssl-trigger')?.addEventListener('click', () => {
    switchTab('sreagent');
    triggerSREAgentChip('d');
  });

  document.getElementById('slackops-infra-trigger')?.addEventListener('click', () => {
    switchTab('sreagent');
    triggerSREAgentChip('a');
  });

  document.getElementById('slackops-running-trigger')?.addEventListener('click', () => {
    simulateSlackCatalogTask('Get Running Jobs', jobsLogs);
  });

  document.getElementById('slackops-ebf-trigger')?.addEventListener('click', () => {
    simulateSlackCatalogTask('Auto EBF', ebfLogs);
  });

  document.getElementById('slackops-threaddump-trigger')?.addEventListener('click', () => {
    simulateSlackCatalogTask('Take Thread Dump', dumpLogs);
  });

  document.getElementById('slackops-dblock-trigger')?.addEventListener('click', () => {
    simulateSlackCatalogTask('Release DB Lock', lockLogs);
  });

  function simulateSlackCatalogTask(name, logLines) {
    const placeholder = slackOpsFeed.querySelector('.console-feed-placeholder');
    if (placeholder) placeholder.remove();

    const card = document.createElement('div');
    card.className = 'slack-card';
    const cleanId = name.toLowerCase().replace(/\s+/g, '-');
    card.innerHTML = `
      <div class="slack-card-header">
        <i data-lucide="bolt" class="slack-card-icon" style="color:#4f46e5;"></i>
        <span class="slack-card-title-text">${name}</span>
        <span class="status-pill status-pending" id="slackops-task-status-${cleanId}">RUNNING</span>
      </div>
      <div class="slack-card-logs" style="font-family: var(--font-mono); font-size: 0.75rem; white-space: pre-wrap; line-height: 1.4; color: #a1a1aa;"></div>
    `;
    slackOpsFeed.appendChild(card);
    slackOpsFeed.scrollTop = slackOpsFeed.scrollHeight;
    refreshIcons();

    const logConsole = card.querySelector('.slack-card-logs');
    const statusPill = card.querySelector('.status-pill');

    let lineIdx = 0;
    function printNextLine() {
      if (lineIdx < logLines.length) {
        logConsole.innerHTML += logLines[lineIdx] + '\n';
        lineIdx++;
        slackOpsFeed.scrollTop = slackOpsFeed.scrollHeight;
        setTimeout(printNextLine, 350);
      } else {
        statusPill.textContent = 'COMPLETED';
        statusPill.className = 'status-pill status-completed';
        addWorkflowToHistory(name, `${(logLines.length * 0.35).toFixed(1)}s`);
      }
    }
    setTimeout(printNextLine, 200);
  }

  // === Cosmic AI Happy Path ===
  const sreagentChatFeed = document.getElementById('sreagent-chat-feed');
  const sreagentChatInput = document.getElementById('sreagent-chat-input');
  const sreagentChatSend = document.getElementById('sreagent-chat-send');

  function appendChatBubble(sender, text, isUser = false, customHtml = '') {
    const row = document.createElement('div');
    row.className = `slack-msg-row ${isUser ? 'user' : 'system'}`;
    
    const avatarIcon = isUser ? 'user' : 'sparkles';

    row.innerHTML = `
      <div class="slack-msg-avatar"><i data-lucide="${avatarIcon}"></i></div>
      <div class="slack-msg-body">
        <span class="slack-msg-sender">${sender}</span>
        <span class="slack-msg-time">Just now</span>
        <p class="chat-p-text">${text}</p>
        ${customHtml}
      </div>
    `;
    sreagentChatFeed.appendChild(row);
    sreagentChatFeed.scrollTop = sreagentChatFeed.scrollHeight;
    refreshIcons();
    return row;
  }

  function showSREAgentTyping(message) {
    const typingRow = document.createElement('div');
    typingRow.className = 'slack-msg-row system typing-indicator';
    typingRow.innerHTML = `
      <div class="slack-msg-avatar"><i data-lucide="sparkles"></i></div>
      <div class="slack-msg-body">
        <span class="slack-msg-sender">Cosmic AI</span>
        <span class="slack-msg-time">Typing...</span>
        <p class="text-zinc-500 italic font-mono text-xs" style="margin:2px 0 0 0; display:flex; align-items:center;"><i data-lucide="refresh-cw" class="icon-spin mr-2" style="width:10px;height:10px;"></i>${message}</p>
      </div>
    `;
    sreagentChatFeed.appendChild(typingRow);
    sreagentChatFeed.scrollTop = sreagentChatFeed.scrollHeight;
    refreshIcons();
    return typingRow;
  }

  function typewriteText(element, text, callback) {
    let index = 0;
    element.innerHTML = '';
    const interval = setInterval(() => {
      element.innerHTML += text.charAt(index);
      index++;
      if (index >= text.length) {
        clearInterval(interval);
        if (callback) callback();
      }
      sreagentChatFeed.scrollTop = sreagentChatFeed.scrollHeight;
    }, 8);
  }

  // Cosmic AI node diagnostics logs database
  const sreNodeLogs = {
    'pod2': `[pod2-status] Checking main environment: cloudstack-prod-use2
[pod2-status] Uptime: 42d 12h
[pod2-status] Kubernetes replica status: 1/1 Running
[pod2-status] CPU: 42%
[pod2-status] Memory: 92% (Heap thrashing warning)
[pod2-status] Error rate: 4.8% (Target SLA: <0.1%)
[pod2-status] Connection pool status: STARVING (Active: 49/50, Idle: 1, Queue: 12)`,
    'cpu-mem': `[check_cpu_memory] Executing docker stats query...
[check_cpu_memory] Node CPU utilization: 42% (Normal)
[check_cpu_memory] Physical Host Memory: 14.8GB / 16.0GB
[check_cpu_memory] Container JVM Max limit: 2048MB
[check_cpu_memory] JVM Resident Set Size (RSS): 1980MB (96.6% allocation)
[check_cpu_memory] Memory check passed with WARNING limit (Heap threshold exceeded)`,
    'jvm-gc': `[check_jvm_gc] Analyzing JVM garbage collector sweeps...
[check_jvm_gc] Garbage Collector: G1 Garbage Collector
[check_jvm_gc] Minor GC duration (avg): 140ms
[check_jvm_gc] Major GC sweeps in past hour: 28
[check_jvm_gc] Time spent in GC pause: 12s per minute (20% CPU overhead)
[check_jvm_gc] CRITICAL: Garbage collection thrashing detected. Heap memory exhausted.`,
    'db-pool': `[check_db_pool] Checking connection pool metadata...
[check_db_pool] Target database: cloudstack-prod-mongo-use2
[check_db_pool] Max connections: 50
[check_db_pool] Active connections: 49
[check_db_pool] Idle connections: 1
[check_db_pool] Average checkout wait time: 1480ms (SLA: <50ms)
[check_db_pool] WARNING: Connection pool starvation detected.`,
    'pool-starvation': `[db_pool_starvation] Root cause analyzer running...
[db_pool_starvation] Active client connections grouped by host IP:
  - 10.240.4.12: 18 connections (Active)
  - 10.240.4.13: 20 connections (Active)
  - 10.240.4.14: 11 connections (Active)
[db_pool_starvation] Queue length: 12 threads waiting for connection.
[db_pool_starvation] CRITICAL: Application threads are blocked waiting for DB connections. Scale maxPoolSize.`,
    'query-latency': `[slow_query_index_scan] Profiling database queries...
[slow_query_index_scan] Target collection: organizations
[slow_query_index_scan] Active query scans:
  - find({ orgId: "org-acme-8842" }) - Index scan: IXSCAN (Completed in 14ms)
  - find({ status: "active" }) - Collscan: COLLSCAN (Completed in 820ms)
[slow_query_index_scan] Query check completed: Index validation OK.`
  };

  const sreagentPrompts = {
    a: {
      text: 'pod2 is slow',
      response: "Analyzing cloudstack-prod-use2 pod2 performance. Initiating parallel SRE diagnostic checks...",
      followup: "Reasoning:\nLatency spikes are caused by garbage collection thrashing under connection pool starvation.\n\nRecommendation:\nScale JVM memory limits and expand Connection Pools via SSP governance.",
      html: `
        <div class="sre-trace-tree">
          <div style="font-weight: 700; font-size: 0.85rem; border-bottom: 1px solid var(--border-color); padding-bottom: 6px; margin-bottom: 8px; display: flex; align-items: center; gap: 6px; color: var(--text-primary);">
            <i data-lucide="network" style="width: 14px; height: 14px; color: #7c3aed;"></i> SRE DIAGNOSTIC SPAN TRACE
          </div>
          
          <div class="tree-node parent-node critical active" data-node="pod2">
            <span class="node-indicator"></span>
            <span class="node-label">pod2 (cloudstack-prod-use2)</span>
            <span class="node-status text-red-500">WARNING</span>
          </div>
          <div class="tree-children">
            <div class="tree-branch-wrapper">
              <div class="tree-node child-node ok" data-node="cpu-mem">
                <span class="node-indicator"></span>
                <span class="node-label">check_cpu_memory</span>
                <span class="node-status text-emerald-500">OK</span>
              </div>
            </div>
            <div class="tree-branch-wrapper">
              <div class="tree-node child-node critical" data-node="jvm-gc">
                <span class="node-indicator"></span>
                <span class="node-label">check_jvm_gc</span>
                <span class="node-status text-red-500">CRITICAL</span>
              </div>
            </div>
            <div class="tree-branch-wrapper">
              <div class="tree-node child-node warning" data-node="db-pool">
                <span class="node-indicator"></span>
                <span class="node-label">check_db_pool</span>
                <span class="node-status text-amber-500">WARNING</span>
              </div>
              <div class="tree-children">
                <div class="tree-branch-wrapper">
                  <div class="tree-node grandchild-node critical" data-node="pool-starvation">
                    <span class="node-indicator"></span>
                    <span class="node-label">db_pool_starvation</span>
                    <span class="node-status text-red-500">CRITICAL</span>
                  </div>
                </div>
                <div class="tree-branch-wrapper">
                  <div class="tree-node grandchild-node ok" data-node="query-latency">
                    <span class="node-indicator"></span>
                    <span class="node-label">slow_query_index_scan</span>
                    <span class="node-status text-emerald-500">OK</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Expandable Raw Logs Drawer -->
          <div class="sre-node-logs-panel" style="margin-top: 10px; padding: 12px; background: #09090b; border: 1px solid var(--border-color); border-radius: var(--radius-sm); font-family: var(--font-mono); font-size: 0.75rem;">
            <div style="color: var(--text-secondary); border-bottom: 1px solid rgba(255, 255, 255, 0.08); padding-bottom: 6px; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center;">
              <span style="font-weight:600;"><i data-lucide="terminal" style="width: 12px; height: 12px; display: inline-block; vertical-align: middle; margin-right: 4px;"></i> Node: <span id="sre-log-node-name" class="text-zinc-100 font-bold">pod2</span></span>
              <span class="text-zinc-500 text-xs">DIAGNOSTIC LOGS</span>
            </div>
            <pre id="sre-log-content" style="color: #a1a1aa; white-space: pre-wrap; word-break: break-all; margin: 0; line-height: 1.4; max-height: 120px; overflow-y: auto;">[pod2-status] Checking main environment: cloudstack-prod-use2
[pod2-status] Uptime: 42d 12h
[pod2-status] Kubernetes replica status: 1/1 Running
[pod2-status] CPU: 42%
[pod2-status] Memory: 92% (Heap thrashing warning)
[pod2-status] Error rate: 4.8% (Target SLA: &lt;0.1%)
[pod2-status] Connection pool status: STARVING (Active: 49/50, Idle: 1, Queue: 12)</pre>
          </div>
        </div>
      `
    },
    b: {
      text: 'delete mongo user testuser on pod2',
      response: "Request received: delete mongo user testuser on cloudstack-prod-use2. Performing security checks...",
      followup: "Awaiting Change Advisory Board approval block. Safe policy enforced.",
      html: `
        <div class="slack-card border-l-emerald my-2" style="max-width: 380px;" id="sreagent-cab-gate-card">
          <div class="slack-card-header">
            <i data-lucide="shield-check" class="slack-card-icon text-emerald"></i>
            <span class="slack-card-title-text">CAB Gate Authorization Required</span>
            <span class="status-pill status-pending" id="sreagent-cab-card-status">PENDING</span>
          </div>
          <div class="slack-card-grid">
            <div class="slack-card-field"><span class="slack-card-field-label">Action Target</span><span class="slack-card-field-val">Delete Mongo User</span></div>
            <div class="slack-card-field"><span class="slack-card-field-label">Resource ID</span><span class="slack-card-field-val font-mono">testuser</span></div>
            <div class="slack-card-field"><span class="slack-card-field-label">Pod Scope</span><span class="slack-card-field-val font-mono">cloudstack-prod-use2</span></div>
            <div class="slack-card-field"><span class="slack-card-field-label">Requester</span><span class="slack-card-field-val">Alex Rivera</span></div>
          </div>
          <div class="slack-card-actions" id="sreagent-cab-actions">
            <button class="slack-card-btn success-btn" id="sreagent-cab-approve-btn"><i data-lucide="check"></i> Approve</button>
            <button class="slack-card-btn danger-btn" id="sreagent-cab-reject-btn"><i data-lucide="x"></i> Reject</button>
          </div>
        </div>
      `
    },
    c: {
      text: 'what did we discuss about pod2?',
      response: "Accessing Cosmic AI vector store for cloudstack-prod-use2 notes...",
      followup: "Memory Recall Search Results:\n- June 12, 2026: SRE Team discussed JVM heap thrashing on pod2.\n- Resolved temporarily by scaling heap config multiplier to 1.5x via NextOps (CHG-372104).\n- Recommended action item: Optimize query indexes to reduce database table scan locks."
    },
    d: {
      text: 'check SSL for acme.com and search jira',
      response: "Executing combined SSL diagnostics and Jira issues search...",
      followup: "SSL Diagnostic results:\n- Acme.com TLS certificate is VALID. Expires in 45 days (July 28, 2026).\n- Encryption standard: TLS 1.3, SHA-256.\n\nJIRA Search results:\n- Found 1 related open ticket: CHG-372104 (Cloud Profiling timeouts)."
    }
  };

  function triggerSREAgentChip(promptId) {
    const data = sreagentPrompts[promptId];
    if (!data) return;

    appendChatBubble('Alex Rivera', data.text, true);

    const typingIndicator = showSREAgentTyping('Cosmic AI is analyzing request parameters...');

    setTimeout(() => {
      typingIndicator.remove();

      const responseRow = appendChatBubble('Cosmic AI', '');
      const textEl = responseRow.querySelector('.chat-p-text');
      
      typewriteText(textEl, data.response, () => {
        if (data.html) {
          const bodyEl = responseRow.querySelector('.slack-msg-body');
          const cardDiv = document.createElement('div');
          cardDiv.innerHTML = data.html;
          bodyEl.appendChild(cardDiv);
          refreshIcons();

          if (promptId === 'a') {
            const nodes = cardDiv.querySelectorAll('.tree-node');
            const nodeNameEl = cardDiv.querySelector('#sre-log-node-name');
            const logContentEl = cardDiv.querySelector('#sre-log-content');
            
            nodes.forEach(node => {
              node.addEventListener('click', () => {
                nodes.forEach(n => n.classList.remove('active'));
                node.classList.add('active');
                
                const nodeId = node.getAttribute('data-node');
                const label = node.querySelector('.node-label')?.textContent || nodeId;
                if (nodeNameEl && logContentEl && sreNodeLogs[nodeId]) {
                  nodeNameEl.textContent = label;
                  logContentEl.textContent = '';
                  let charIdx = 0;
                  const logText = sreNodeLogs[nodeId];
                  const logTimer = setInterval(() => {
                    logContentEl.textContent += logText.charAt(charIdx);
                    charIdx++;
                    if (charIdx >= logText.length) {
                      clearInterval(logTimer);
                    }
                    sreagentChatFeed.scrollTop = sreagentChatFeed.scrollHeight;
                  }, 4);
                }
              });
            });
          }

          if (promptId === 'b') {
            const approveBtn = document.getElementById('sreagent-cab-approve-btn');
            const rejectBtn = document.getElementById('sreagent-cab-reject-btn');
            const statusPill = document.getElementById('sreagent-cab-card-status');
            const actionsRow = document.getElementById('sreagent-cab-actions');

            approveBtn?.addEventListener('click', () => {
              statusPill.textContent = 'APPROVED';
              statusPill.className = 'status-pill status-completed';
              actionsRow.remove();
              appendChatBubble('Cosmic AI', 'Action approved. Running Mongo user deletion workflow. User testuser successfully removed from cloudstack-prod-use2.');
            });

            rejectBtn?.addEventListener('click', () => {
              statusPill.textContent = 'DENIED';
              statusPill.className = 'status-pill status-denied';
              actionsRow.remove();
              appendChatBubble('Cosmic AI', 'Action denied. Operation cancelled.');
            });
          }
        }

        if (data.followup) {
          setTimeout(() => {
            const followupTyping = showSREAgentTyping('Cosmic AI is reasoning...');
            setTimeout(() => {
              followupTyping.remove();
              const followupRow = appendChatBubble('Cosmic AI', '');
              const followupEl = followupRow.querySelector('.chat-p-text');
              
              // Custom faster typing speed for longer followup text
              let idx = 0;
              const followupInterval = setInterval(() => {
                followupEl.innerHTML += data.followup.charAt(idx);
                idx++;
                if (idx >= data.followup.length) {
                  clearInterval(followupInterval);
                }
                sreagentChatFeed.scrollTop = sreagentChatFeed.scrollHeight;
              }, 6);
            }, 800);
          }, 600);
        }
      });

    }, 1000);
  }

  // Suggestion chips click event
  const chips = document.querySelectorAll('.slack-chip');
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const promptId = chip.getAttribute('data-prompt-id');
      triggerSREAgentChip(promptId);
    });
  });

  // Custom text send in chat
  sreagentChatSend?.addEventListener('click', sendCustomSREAgentText);
  sreagentChatInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sendCustomSREAgentText();
  });

  function sendCustomSREAgentText() {
    const text = sreagentChatInput.value.trim();
    if (!text) return;

    sreagentChatInput.value = '';
    appendChatBubble('Alex Rivera', text, true);

    const typing = showSREAgentTyping('Parsing user request parameters...');
    setTimeout(() => {
      typing.remove();
      const responseRow = appendChatBubble('Cosmic AI', '');
      const responseEl = responseRow.querySelector('.chat-p-text');
      typewriteText(responseEl, `Received request: "${text}". I am a simulated agent interface. Please click one of the pre-defined suggestion chips above to demonstrate my automated SRE checks and memory recall capabilities!`);
    }, 1000);
  }

  // === SSP Happy Path ===
  const govportalFormSubmit = document.getElementById('govportal-form-submit');
  const govportalFormItem = document.getElementById('govportal-form-item');
  const govportalToggleFields = document.getElementById('govportal-toggle-fields');

  const govportalViewForm = document.getElementById('govportal-view-form');
  const govportalViewJira = document.getElementById('govportal-view-jira');
  const govportalViewSlack = document.getElementById('govportal-view-slack');
  const govportalViewEmail = document.getElementById('govportal-view-email');

  // Open SSP Catalog Modal
  document.getElementById('govportal-open-catalog-btn')?.addEventListener('click', () => {
    openModal('govportal-catalog');
  });

  // SSP Catalog Modal Logic (Category Filtering & Search)
  const catalogCatBtns = document.querySelectorAll('.catalog-cat-btn');
  const catalogItemCards = document.querySelectorAll('.catalog-item-card');
  const govportalSelectCatalogBtn = document.getElementById('govportal-select-catalog-btn');
  const catalogSearchInput = document.getElementById('catalog-search-input');

  function filterCatalog() {
    const query = catalogSearchInput?.value.toLowerCase() || '';
    const activeCatBtn = document.querySelector('.catalog-cat-btn.active');
    const cat = activeCatBtn ? activeCatBtn.getAttribute('data-catalog-cat') : 'all';
    
    catalogItemCards.forEach(card => {
      const name = card.querySelector('.catalog-item-name')?.textContent.toLowerCase() || '';
      const desc = card.querySelector('.catalog-item-desc')?.textContent.toLowerCase() || '';
      const itemCat = card.getAttribute('data-cat');
      
      const matchesCat = (cat === 'all' || itemCat === cat);
      const matchesSearch = (name.includes(query) || desc.includes(query));
      
      if (matchesCat && matchesSearch) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  }

  catalogSearchInput?.addEventListener('input', filterCatalog);

  catalogCatBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      catalogCatBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterCatalog();
    });
  });

  catalogItemCards.forEach(card => {
    card.addEventListener('click', () => {
      catalogItemCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
    });
  });

  govportalSelectCatalogBtn?.addEventListener('click', () => {
    const activeCard = document.querySelector('.catalog-item-card.active');
    if (activeCard) {
      const val = activeCard.getAttribute('data-workflow-value');
      const name = activeCard.querySelector('.catalog-item-name')?.textContent || '';
      
      const govportalFormItemDisplay = document.getElementById('govportal-form-item-display');
      
      if (govportalFormItem && govportalFormItemDisplay) {
        govportalFormItem.value = val;
        govportalFormItemDisplay.value = name;
        govportalFormItem.dispatchEvent(new Event('change'));
      }
      closeModal('govportal-catalog');
    }
  });

  // Change fields based on catalog item
  govportalFormItem?.addEventListener('change', (e) => {
    if (e.target.value === 'toggle') {
      govportalToggleFields.style.display = 'block';
    } else {
      govportalToggleFields.style.display = 'none';
    }
  });

  // Governance stepper elements
  const govportalSteps = {
    1: document.getElementById('govportal-step-1'),
    2: document.getElementById('govportal-step-2'),
    3: document.getElementById('govportal-step-3'),
    4: document.getElementById('govportal-step-4'),
    5: document.getElementById('govportal-step-5')
  };

  function setSSPStepState(stepNum, state, message = '') {
    const stepEl = govportalSteps[stepNum];
    if (!stepEl) return;

    stepEl.className = `govportal-step ${state}`;
    const statusText = stepEl.querySelector('.govportal-step-status');
    if (statusText && message) statusText.textContent = message;

    const iconEl = stepEl.querySelector('.govportal-step-icon');
    if (state === 'completed') {
      iconEl.innerHTML = '<i data-lucide="check" style="width:12px;height:12px;stroke-width:3px;"></i>';
    } else if (state === 'current') {
      iconEl.innerHTML = stepNum;
      iconEl.style.backgroundColor = '';
      iconEl.style.borderColor = '';
    } else if (state === 'failed') {
      iconEl.innerHTML = '<i data-lucide="x" style="width:12px;height:12px;stroke-width:3px;color:#ffffff;"></i>';
      iconEl.style.backgroundColor = '#dc2626';
      iconEl.style.borderColor = '#dc2626';
    }
    refreshIcons();
  }

  function resetSSPStepper() {
    setSSPStepState(1, 'current', 'Pending form inputs...');
    setSSPStepState(2, '', 'Not started');
    setSSPStepState(3, '', 'Not started');
    setSSPStepState(4, '', 'Not started');
    setSSPStepState(5, '', 'Not started');
    
    // Restore default step icon contents
    for (let i = 2; i <= 5; i++) {
      if (govportalSteps[i]) govportalSteps[i].querySelector('.govportal-step-icon').innerHTML = i;
    }

    govportalViewForm.classList.add('active');
    govportalViewJira.classList.remove('active');
    govportalViewSlack.classList.remove('active');
    govportalViewEmail.classList.remove('active');
  }

  govportalFormSubmit?.addEventListener('click', () => {
    const selectedItem = govportalFormItem.value;
    const displayValue = document.getElementById('govportal-form-item-display').value;
    const pod = document.getElementById('govportal-form-pod').value;
    const org = document.getElementById('govportal-form-org').value;
    const pmTicket = document.getElementById('govportal-form-pmticket').value;

    setSSPStepState(1, 'completed', 'Validated change request parameters.');

    govportalViewForm.classList.remove('active');
    govportalViewJira.classList.add('active');

    const govportalJiraKey = document.getElementById('govportal-jira-key');
    const govportalJiraSummary = document.getElementById('govportal-jira-summary');
    const govportalJiraDesc = document.getElementById('govportal-jira-desc');
    const govportalJiraStatus = document.getElementById('govportal-jira-status');

    govportalJiraStatus.textContent = 'READY FOR CAB APPROVAL';
    govportalJiraStatus.className = 'jira-status-badge yellow';

    if (selectedItem === 'toggle') {
      const toggleId = document.getElementById('govportal-form-toggleid').value;
      const act = document.getElementById('govportal-form-action').value;
      const val = document.getElementById('govportal-form-value').value;

      govportalJiraKey.textContent = 'CHG-50284';
      govportalJiraSummary.textContent = `[Cloud-SSP] Feature Toggle ${toggleId} | Pod ${pod} | Org ${org}`;
      govportalJiraDesc.textContent = `Governed Change Request submitted via SSP. Action: ${act} toggle ${toggleId} to ${val}. Associated project manager validation ticket: ${pmTicket}.`;
    } else if (selectedItem === 'executor') {
      govportalJiraKey.textContent = 'CHG-50285';
      govportalJiraSummary.textContent = `[Cloud-SSP] Mongo Logs Export | Pod ${pod} | Org ${org}`;
      govportalJiraDesc.textContent = `Governed Logs Export Request submitted via SSP. Target Org ID: ${org} on Pod ${pod}. Associated PM security clearance ticket: ${pmTicket}.`;
    } else {
      const randKey = Math.floor(100000 + Math.random() * 900000);
      govportalJiraKey.textContent = `CHG-${randKey}`;
      govportalJiraSummary.textContent = `[Cloud-SSP] ${displayValue} | Pod ${pod} | Org ${org}`;
      govportalJiraDesc.textContent = `Governed change execution workflow "${displayValue}" requested on namespace ${pod} for tenant organization ${org}. Associated authorization reference ticket: ${pmTicket}.`;
    }

    setTimeout(() => {
      setSSPStepState(2, 'completed', 'Jira change ticket generated.');
      setSSPStepState(3, 'current', 'Awaiting CAB Approval check...');

      govportalViewJira.classList.remove('active');
      govportalViewSlack.classList.add('active');

      const govportalSlackCardTitle = document.getElementById('govportal-slack-card-title');
      const govportalSlackCardGrid = document.getElementById('govportal-slack-card-grid');
      const govportalSlackActions = document.getElementById('govportal-slack-actions-row');
      const govportalSlackStatus = document.getElementById('govportal-slack-card-status');

      govportalSlackStatus.textContent = 'AWAITING APPROVAL';
      govportalSlackStatus.className = 'status-pill status-pending';

      govportalSlackActions.style.display = 'flex';

      if (selectedItem === 'toggle') {
        const toggleId = document.getElementById('govportal-form-toggleid').value;
        const val = document.getElementById('govportal-form-value').value;
        
        govportalSlackCardTitle.textContent = 'Feature Toggle Request';
        govportalSlackCardGrid.innerHTML = `
          <div class="slack-card-field"><span class="slack-card-field-label">Action</span><span class="slack-card-field-val">Toggle Configuration</span></div>
          <div class="slack-card-field"><span class="slack-card-field-label">Toggle ID</span><span class="slack-card-field-val font-mono">${toggleId}</span></div>
          <div class="slack-card-field"><span class="slack-card-field-label">Value</span><span class="slack-card-field-val">${val}</span></div>
          <div class="slack-card-field"><span class="slack-card-field-label">Pod Scope</span><span class="slack-card-field-val font-mono">${pod}</span></div>
          <div class="slack-card-field"><span class="slack-card-field-label">PM Reference</span><span class="slack-card-field-val font-mono">${pmTicket}</span></div>
        `;
      } else if (selectedItem === 'executor') {
        govportalSlackCardTitle.textContent = 'Mongo Logs Export';
        govportalSlackCardGrid.innerHTML = `
          <div class="slack-card-field"><span class="slack-card-field-label">Action</span><span class="slack-card-field-val">DB Export (Encrypted)</span></div>
          <div class="slack-card-field"><span class="slack-card-field-label">Target Pod</span><span class="slack-card-field-val font-mono">${pod}</span></div>
          <div class="slack-card-field"><span class="slack-card-field-label">Target Org</span><span class="slack-card-field-val font-mono">${org}</span></div>
          <div class="slack-card-field"><span class="slack-card-field-label">PM Reference</span><span class="slack-card-field-val font-mono">${pmTicket}</span></div>
        `;
      } else {
        govportalSlackCardTitle.textContent = displayValue;
        govportalSlackCardGrid.innerHTML = `
          <div class="slack-card-field"><span class="slack-card-field-label">Workflow</span><span class="slack-card-field-val">${displayValue}</span></div>
          <div class="slack-card-field"><span class="slack-card-field-label">Target Pod</span><span class="slack-card-field-val font-mono">${pod}</span></div>
          <div class="slack-card-field"><span class="slack-card-field-label">Target Org</span><span class="slack-card-field-val font-mono">${org}</span></div>
          <div class="slack-card-field"><span class="slack-card-field-label">Reference</span><span class="slack-card-field-val font-mono">${pmTicket}</span></div>
        `;
      }
    }, 1500);
  });

  // Slack CAB Approve click
  document.getElementById('govportal-slack-approve-btn')?.addEventListener('click', () => {
    const govportalSlackStatus = document.getElementById('govportal-slack-card-status');
    const govportalSlackActions = document.getElementById('govportal-slack-actions-row');
    const selectedItem = govportalFormItem.value;

    govportalSlackStatus.textContent = 'APPROVED';
    govportalSlackStatus.className = 'status-pill status-completed';
    govportalSlackActions.style.display = 'none';

    setSSPStepState(3, 'completed', 'CAB authorized change request.');
    setSSPStepState(4, 'current', 'Applying changes in cluster...');

    setTimeout(() => {
      setSSPStepState(4, 'completed', 'GitOps config synchronization complete.');
      setSSPStepState(5, 'current', 'Dispatching deliverables...');

      setTimeout(() => {
        setSSPStepState(5, 'completed', 'Audit ledger compiled & notification emailed.');

        govportalViewSlack.classList.remove('active');
        govportalViewEmail.classList.add('active');

        const emailSub = document.getElementById('govportal-email-subject');
        const emailBody = govportalViewEmail.querySelector('.email-body');

        // Reset key reveal button
        const keyRevealBtn = document.getElementById('govportal-key-reveal-btn');
        const keyDisplay = document.getElementById('govportal-fernet-key-display');
        
        if (keyRevealBtn) {
          keyRevealBtn.disabled = false;
          keyRevealBtn.textContent = 'Reveal Key';
        }
        if (keyDisplay) {
          keyDisplay.textContent = 'gAAAAABmX_k9R...';
        }

        const displayValue = document.getElementById('govportal-form-item-display').value;
        if (selectedItem === 'toggle') {
          const toggleId = document.getElementById('govportal-form-toggleid').value;
          const val = document.getElementById('govportal-form-value').value;
          const pod = document.getElementById('govportal-form-pod').value;

          emailSub.textContent = `Completed: governed workflow wf-toggle Feature Toggle applied`;
          emailBody.innerHTML = `
            <div class="email-card-branding">
              <i data-lucide="shield-check" class="email-branding-icon"></i>
              <h4>Cloud Self Service Portal</h4>
            </div>
            <p>Governed feature toggle update completed successfully.</p>
            
            <div class="email-metrics-box">
              <div class="email-metric-row">
                <span class="email-metric-label">Toggle Reference:</span>
                <span class="font-mono text-zinc-100 font-bold">${toggleId}</span>
              </div>
              <div class="email-metric-row">
                <span class="email-metric-label">New Value:</span>
                <span class="font-mono text-emerald-400 font-bold">${val}</span>
              </div>
              <div class="email-metric-row">
                <span class="email-metric-label">Target Infrastructure:</span>
                <span class="font-mono">${pod}</span>
              </div>
            </div>

            <p class="text-zinc-400 text-xs">A GitOps pull request was automatically merged, updating target configurations. Pods on ${pod} have been synchronized and successfully re-verified.</p>
            <button class="slack-btn-modal-cancel w-fit mt-4" id="govportal-btn-restart-demo">Start New Change Request</button>
          `;
        } else if (selectedItem === 'executor') {
          const pod = document.getElementById('govportal-form-pod').value;
          emailSub.textContent = `Completed: governed workflow wf-logs-export Mongo logs export`;
          emailBody.innerHTML = `
            <div class="email-card-branding">
              <i data-lucide="shield-check" class="email-branding-icon"></i>
              <h4>Cloud Self Service Portal</h4>
            </div>
            <p>The requested Mongo logs have been extracted, packaged, and encrypted. Direct file access is provided below.</p>
            
            <div class="email-metrics-box">
              <div class="email-metric-row">
                <span class="email-metric-label">Encrypted Log File:</span>
                <a href="#" class="email-link">Click here to access OneDrive folder</a>
              </div>
              <div class="email-metric-row">
                <span class="email-metric-label">Fernet Decryption Key:</span>
                <code class="email-key-box" id="govportal-fernet-key-display">gAAAAABmX_k9R...</code>
                <button class="email-copy-btn" id="govportal-key-reveal-btn">Reveal Key</button>
              </div>
              <div class="email-metric-row">
                <span class="email-metric-label">Total Size:</span>
                <span>14.2 MB</span>
              </div>
            </div>

            <div class="email-instructions-box">
              <h5>Decryption Instructions</h5>
              <p>To decrypt files locally on a terminal with Python cryptography installed, run the following parameters:</p>
              <code>python decrypt.py logs.enc &lt;fernet_key&gt;</code>
            </div>
            <button class="slack-btn-modal-cancel w-fit mt-4" id="govportal-btn-restart-demo">Start New Change Request</button>
          `;
          
          document.getElementById('govportal-key-reveal-btn')?.addEventListener('click', () => {
            const display = document.getElementById('govportal-fernet-key-display');
            const btn = document.getElementById('govportal-key-reveal-btn');
            if (display && btn) {
              display.textContent = 'gAAAAABmX_k9RzH3p7F4L2K9w5E1N3R9f8g0h2j4k6l8m0o2p4q6r8s0t2u4v6w8x9z==';
              btn.disabled = true;
              btn.textContent = 'Copied';
            }
          });
        } else {
          const pod = document.getElementById('govportal-form-pod').value;
          emailSub.textContent = `Completed: governed workflow wf-generic ${displayValue} executed`;
          emailBody.innerHTML = `
            <div class="email-card-branding">
              <i data-lucide="shield-check" class="email-branding-icon"></i>
              <h4>Cloud Self Service Portal</h4>
            </div>
            <p>Governed change request for <strong>${displayValue}</strong> completed successfully.</p>
            
            <div class="email-metrics-box">
              <div class="email-metric-row">
                <span class="email-metric-label">Workflow:</span>
                <span class="font-mono text-zinc-100 font-bold">${displayValue}</span>
              </div>
              <div class="email-metric-row">
                <span class="email-metric-label">Target Pod:</span>
                <span class="font-mono">${pod}</span>
              </div>
              <div class="email-metric-row">
                <span class="email-metric-label">Audit Log Ref:</span>
                <span class="font-mono text-emerald-400 font-bold">wf-${Math.floor(1000 + Math.random() * 9000)}</span>
              </div>
            </div>

            <p class="text-zinc-400 text-xs">Governed actions were successfully completed and logged in the immutable security ledger. Deployment states were verified automatically and marked stable.</p>
            <button class="slack-btn-modal-cancel w-fit mt-4" id="govportal-btn-restart-demo">Start New Change Request</button>
          `;
        }

        document.getElementById('govportal-btn-restart-demo')?.addEventListener('click', resetSSPStepper);
        refreshIcons();
      }, 1500);
    }, 1500);
  });

  // Slack CAB Reject click
  document.getElementById('govportal-slack-reject-btn')?.addEventListener('click', () => {
    const govportalSlackStatus = document.getElementById('govportal-slack-card-status');
    const govportalSlackActions = document.getElementById('govportal-slack-actions-row');

    govportalSlackStatus.textContent = 'REJECTED';
    govportalSlackStatus.className = 'status-pill status-denied';
    govportalSlackActions.style.display = 'none';

    setSSPStepState(3, 'failed', 'CAB Approval Denied.');
    
    const govportalJiraStatus = document.getElementById('govportal-jira-status');
    if (govportalJiraStatus) {
      govportalJiraStatus.textContent = 'CANCELLED / REJECTED';
      govportalJiraStatus.className = 'jira-status-badge red';
    }

    // Append rollback logs
    const rollbackDiv = document.createElement('div');
    rollbackDiv.className = 'govportal-rollback-log';
    rollbackDiv.style.marginTop = '15px';
    rollbackDiv.style.padding = '12px';
    rollbackDiv.style.background = '#18181b';
    rollbackDiv.style.border = '1px solid #dc2626';
    rollbackDiv.style.borderRadius = 'var(--radius-sm)';
    rollbackDiv.style.fontFamily = 'var(--font-mono)';
    rollbackDiv.style.fontSize = '0.75rem';
    rollbackDiv.innerHTML = `
      <div style="color: #ef4444; font-weight: bold; border-bottom: 1px solid rgba(220, 38, 38, 0.3); padding-bottom: 6px; margin-bottom: 8px; display: flex; align-items: center; gap: 6px;">
        <i data-lucide="shield-alert" style="width: 14px; height: 14px;"></i> AUTOMATED GITOPS ROLLBACK IN PROGRESS
      </div>
      <div class="rollback-lines" style="color: #a1a1aa; line-height: 1.4; max-height: 120px; overflow-y: auto;">
        [system] CAB rejection event received. Aborting change pipeline...<br>
      </div>
    `;
    govportalViewSlack.appendChild(rollbackDiv);
    refreshIcons();

    const lines = [
      "[gitops] Reverting configuration pull request...",
      "[gitops] Restoring replica configuration hashes to parent target standard...",
      "[k8s] Triggering health verification on target namespace...",
      "[system] Rollback check complete. Cluster status: stable. Zero configurations altered.",
      "[jira] Updated ticket status to CANCELLED."
    ];

    const linesEl = rollbackDiv.querySelector('.rollback-lines');
    let lineIdx = 0;
    function addLine() {
      if (lineIdx < lines.length) {
        linesEl.innerHTML += `${lines[lineIdx]}<br>`;
        lineIdx++;
        setTimeout(addLine, 400);
      } else {
        const rejectMsg = document.createElement('div');
        rejectMsg.innerHTML = `<button class="slack-btn-modal-cancel w-fit mt-4" id="govportal-btn-restart-demo">Start New Change Request</button>`;
        govportalViewSlack.appendChild(rejectMsg);
        document.getElementById('govportal-btn-restart-demo')?.addEventListener('click', () => {
          rollbackDiv.remove();
          rejectMsg.remove();
          resetSSPStepper();
        });
      }
    }
    setTimeout(addLine, 400);
  });

  // JIRA Link click inside slack card
  document.getElementById('govportal-slack-open-jira')?.addEventListener('click', () => {
    govportalViewSlack.classList.remove('active');
    govportalViewJira.classList.add('active');
  });

  // === Ops-Sage alert automation demo ===
  const opssageTabBtns = document.querySelectorAll('[data-rcagen-tab]');
  const opssagePanes = document.querySelectorAll('.rcagen-content-pane');

  opssageTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-rcagen-tab');
      opssageTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      opssagePanes.forEach(pane => {
        const isTarget = pane.getAttribute('id') === `rcagen-tab-${targetTab}`;
        pane.classList.toggle('active', isTarget);
      });
    });
  });

  const opssageScenarios = {
    heap: {
      title: 'heap-scale-v2 · JVM heap above 90%',
      steps: [
        'Alert matched to runbook heap-scale-v2',
        'Validate: single pod spike confirmed on cloudstack-prod-use2',
        'Validate: no active deployment in progress',
        'Validate: heap trend sustained &gt; 5 minutes',
        'Execute: SSP workflow wf-heap-scale (JVM multiplier 1.5x)',
        'Notify: Slack summary posted to #cloudstack-ops-alerts',
      ],
      result: 'Complete — heap reduced to 45% baseline. On-call not paged.',
      actionLog: {
        alert: 'JVM heap utilization above 90%',
        action: 'heap-scale-v2',
        pod: 'cloudstack-prod-use2',
      },
    },
    latency: {
      title: 'conn-pool-scale · API latency p99 high',
      steps: [
        'Alert matched to runbook conn-pool-scale',
        'Validate: DB connection pool at capacity (100/100)',
        'Validate: no open Sev-1 incidents',
        'Execute: scale pool ConfigMap 100 → 200',
        'Execute: rolling restart auth-service pods',
        'Notify: latency p99 back under 120ms',
      ],
      result: 'Complete — connection pool scaled. On-call not paged.',
      actionLog: {
        alert: 'API latency p99 &gt; 2500ms',
        action: 'conn-pool-scale',
        pod: 'cloudstack-prod-use2',
      },
    },
    disk: {
      title: 'log-rotate-sweep · disk usage high',
      steps: [
        'Alert matched to runbook log-rotate-sweep',
        'Validate: growth is log volume, not data disk',
        'Validate: node pool cloudstack-prod-apse1 healthy',
        'Execute: log rotation job triggered on worker pool',
        'Notify: disk usage reduced to 62%',
      ],
      result: 'Complete — log sweep finished. On-call not paged.',
      actionLog: {
        alert: 'Disk usage &gt; 85% on worker pool',
        action: 'log-rotate-sweep',
        pod: 'cloudstack-prod-apse1',
      },
    },
  };

  const opssageProgressPanel = document.getElementById('opssage-progress-panel');
  const opssageProgressTitle = document.getElementById('opssage-progress-title');
  const opssageProgressStatus = document.getElementById('opssage-progress-status');
  const opssageChecklist = document.getElementById('opssage-checklist');
  const opssageProgressBar = document.getElementById('opssage-progress-bar');
  const opssageProgressLog = document.getElementById('opssage-progress-log');
  const opssageActionLogBody = document.getElementById('opssage-action-log-body');

  document.querySelectorAll('.opssage-process-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-opssage-id');
      const scenario = opssageScenarios[id];
      if (!scenario || btn.disabled) return;

      btn.disabled = true;
      const statusEl = document.getElementById(`opssage-status-${id}`);
      if (statusEl) {
        statusEl.textContent = 'Processing';
        statusEl.className = 'status-pill status-pending';
      }

      opssageProgressPanel?.classList.remove('hidden');
      if (opssageProgressTitle) opssageProgressTitle.textContent = scenario.title;
      if (opssageProgressStatus) {
        opssageProgressStatus.textContent = 'VALIDATING';
        opssageProgressStatus.className = 'status-pill status-pending';
      }
      if (opssageChecklist) opssageChecklist.innerHTML = '';
      if (opssageProgressBar) opssageProgressBar.style.width = '0%';
      if (opssageProgressLog) opssageProgressLog.textContent = 'Starting validation pipeline...';

      let step = 0;
      const total = scenario.steps.length;

      const runStep = () => {
        if (step >= total) {
          if (opssageProgressStatus) {
            opssageProgressStatus.textContent = 'COMPLETE';
            opssageProgressStatus.className = 'status-pill status-completed';
          }
          if (opssageProgressBar) opssageProgressBar.style.width = '100%';
          if (opssageProgressLog) opssageProgressLog.textContent = scenario.result;
          if (statusEl) {
            statusEl.textContent = 'Resolved';
            statusEl.className = 'status-pill status-completed';
          }
          if (opssageActionLogBody && scenario.actionLog) {
            const row = document.createElement('tr');
            row.innerHTML = `
              <td class="font-mono text-xs">${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' })} UTC</td>
              <td>${scenario.actionLog.alert}</td>
              <td class="font-mono text-xs">${scenario.actionLog.action}</td>
              <td><span class="foundation-badge m-0">${scenario.actionLog.pod}</span></td>
              <td><span class="status-badge complete">Complete</span></td>
              <td>No</td>
            `;
            opssageActionLogBody.prepend(row);
          }
          return;
        }

        if (opssageChecklist) {
          const item = document.createElement('div');
          item.className = 'opssage-check-item';
          item.innerHTML = `<span class="opssage-check-icon pending"></span><span>${scenario.steps[step]}</span>`;
          opssageChecklist.appendChild(item);
          setTimeout(() => {
            item.querySelector('.opssage-check-icon')?.classList.replace('pending', 'done');
          }, 400);
        }

        const pct = Math.round(((step + 1) / total) * 100);
        if (opssageProgressBar) opssageProgressBar.style.width = `${pct}%`;
        if (opssageProgressLog) opssageProgressLog.textContent = scenario.steps[step];
        if (step >= 2 && opssageProgressStatus) {
          opssageProgressStatus.textContent = 'EXECUTING';
        }

        step++;
        setTimeout(runStep, 900);
      };

      setTimeout(runStep, 300);
    });
  });
}

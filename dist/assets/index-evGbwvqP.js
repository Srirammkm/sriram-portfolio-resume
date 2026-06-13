(function(){const d=document.createElement("link").relList;if(d&&d.supports&&d.supports("modulepreload"))return;for(const v of document.querySelectorAll('link[rel="modulepreload"]'))u(v);new MutationObserver(v=>{for(const f of v)if(f.type==="childList")for(const h of f.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&u(h)}).observe(document,{childList:!0,subtree:!0});function r(v){const f={};return v.integrity&&(f.integrity=v.integrity),v.referrerPolicy&&(f.referrerPolicy=v.referrerPolicy),v.crossOrigin==="use-credentials"?f.credentials="include":v.crossOrigin==="anonymous"?f.credentials="omit":f.credentials="same-origin",f}function u(v){if(v.ep)return;v.ep=!0;const f=r(v);fetch(v.href,f)}})();document.addEventListener("DOMContentLoaded",()=>{lucide.createIcons(),Oe(),_e(),$e(),Ge(),He(),ze(),je()});function Oe(){const n=document.getElementById("theme-toggle");if(!n)return;const d=r=>{document.documentElement.setAttribute("data-theme",r);const u=document.querySelector('meta[name="color-scheme"]');u&&(u.content=r),localStorage.setItem("color-scheme",r)};n.addEventListener("click",()=>{const u=(document.documentElement.getAttribute("data-theme")||(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"))==="dark"?"light":"dark";d(u)}),window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",r=>{if(!localStorage.getItem("color-scheme")){const u=r.matches?"dark":"light";document.documentElement.removeAttribute("data-theme");const v=document.querySelector('meta[name="color-scheme"]');v&&(v.content=u)}})}function _e(){const n=document.getElementById("view-toggle");if(!n)return;const d=n.querySelector(".btn-text"),r=n.querySelector("i");n.addEventListener("click",()=>{document.body.classList.contains("printable-active")?(document.body.classList.remove("printable-active"),document.body.classList.add("dashboard-active"),d&&(d.textContent="ATS Print View"),r&&(r.setAttribute("data-lucide","file-text"),lucide.createIcons())):(document.body.classList.remove("dashboard-active"),document.body.classList.add("printable-active"),d&&(d.textContent="Dashboard View"),r&&(r.setAttribute("data-lucide","layout-dashboard"),lucide.createIcons()),window.scrollTo({top:0,behavior:"instant"}))})}function $e(){const n=document.querySelectorAll(".skill-tag"),d=document.getElementById("reset-skills-btn"),r=document.querySelector(".timeline"),u=document.querySelectorAll(".job-bullets li"),v=document.querySelectorAll(".project-tech-stack .tech-tag");let f=null;if(n.length===0)return;const h=()=>{f=null,n.forEach(b=>b.classList.remove("active")),r&&r.classList.remove("skill-filtered"),u.forEach(b=>b.classList.remove("matching-bullet")),v.forEach(b=>b.classList.remove("highlighted")),d&&d.classList.add("hidden")},q=b=>{f=b,n.forEach(y=>{const T=y.getAttribute("data-skill")===b;y.classList.toggle("active",T)}),r&&r.classList.add("skill-filtered"),u.forEach(y=>{const D=(y.getAttribute("data-skills")||"").split(" ").includes(b);y.classList.toggle("matching-bullet",D)}),v.forEach(y=>{const V=(y.getAttribute("data-skill-highlight")||"")===b;y.classList.toggle("highlighted",V)}),d&&d.classList.remove("hidden")};n.forEach(b=>{b.addEventListener("click",()=>{const y=b.getAttribute("data-skill");f===y?h():q(y)})}),d&&d.addEventListener("click",h)}function He(){const n=document.getElementById("print-btn");n&&n.addEventListener("click",()=>{window.print()})}function Ge(){const n=document.getElementById("copy-markdown-btn");if(!n)return;const d=`SRIRAM MANIKANTH
Bangalore Urban, Karnataka 560093 | 7010561869 | msriram0803@gmail.com
LinkedIn: www.linkedin.com/in/sriram-manikanth-m-685323129

SUMMARY
Results-oriented DevOps professional specializing in AI-driven automation and scalable infrastructure solutions. Expertise in Kubernetes and Terraform drives enhanced operational efficiency and improved deployment speed. Collaborates with cross-functional teams to deliver innovative solutions that elevate service reliability and customer satisfaction.

SKILLS
* DevOps & SRE: DevOps, CI/CD, GitOps, SRE, System Architecture, Incident Management, Cost Management Strategies, ChatOps, Incident Response, Disaster Recovery (DR).
* Cloud & Platforms: Kubernetes, Docker, AWS, Azure, GCP, Ansible, Chef, IBM MQ.
* AI & Automation: Large Language Models (LLM), Azure OpenAI, AI Automation, Temporal Workflows, Python, Bash Scripting.
* Collaboration: Microsoft Teams, Slack, Team Collaboration Tools.

EXPERIENCE

SALESFORCE - Bangalore Urban, Karnataka
Member of Technical Staff | March 2026 – Present
* Architected and built NextOps, a Slack-native ChatOps/self-service platform for automating production operations, featuring Temporal-backed workflows, a live Slack-administered RBAC engine, on-call automation, and AI-driven Root Cause Analysis.
* Designed and implemented Cosmic AI, a manifest-driven AI agent platform that manages multi-tenant cloud infrastructure via natural-language Slack/Teams chat, leveraging YAML specs for auto-compilation into Temporal workers with LLM query generation and capability-level RBAC.

INFORMATICA - Bengaluru, Karnataka
Senior DevOps Engineer | April 2024 – March 2026
* Designed and developed a scalable AI Agent Orchestration Platform, incorporating dynamic task chaining, parallel execution, intelligent data flow, and a central agent knowledge layer for improved automation accuracy and accelerated multi-step workflows.
* Built an in-house AI-powered Incident Assistant Tool for proactive incident prevention and support, and an AI-driven Root Cause Analysis (RCA) Tool to enhance issue identification and resolution.
* Developed multiple Microsoft Teams bots to support team operations and streamline incident management processes.
* Created a self-service portal using Python and Temporal, enabling teams to independently run scripts and perform operational tasks, reducing reliance on DevOps/Platform support.
* Automated Emergency Bug Fix (EBF) deployments, optimizing the release process and achieving a 50% increase in deployment speed by minimizing manual intervention.
* Partnered with customers to diagnose and resolve critical issues, ensuring high satisfaction and reliable service delivery.
* Contributed to Disaster Recovery (DR) drills, driving process enhancements and reducing recovery times annually.
* Collaborated with the FinOps team to monitor and optimize infrastructure costs, implementing cost-efficient architectures that significantly lowered cloud expenses.

INFORMATICA - Bengaluru, Karnataka
DevOps Engineer | September 2022 – April 2024
* Led the onboarding of a multi-cloud data platform service across AWS, Azure, and GCP, optimizing data management workflows.
* Collaborated with cross-functional teams to implement GitOps methodologies, enhancing version control and deployment accuracy.
* Utilized Kubernetes to orchestrate containerized applications, improving scalability and resource utilization.
* Engineered infrastructure as code (IaC) using Terraform to ensure consistent and repeatable environment provisioning.
* Employed Chef for configuration management, automating software deployments and system configurations.
* Developed Python and Bash scripts to automate routine tasks, reducing manual effort by 80%.
* Played a key role in cloud migrations, ensuring minimal downtime and seamless data transition.
* Swiftly addressed production incidents, performing root cause analysis and implementing corrective actions.
* Contributed to the development of internal tools, streamlining team processes and enhancing productivity.

THOUGHTWORKS - Bangalore Urban, Karnataka
Infrastructure Consultant | December 2021 – August 2022
* Implemented automation solutions using Python to streamline infrastructure management tasks.
* Managed application deployments within Kubernetes environments, ensuring smooth operations and scalability.
* Designed and implemented robust CI/CD pipelines to accelerate software delivery and improve release reliability.
* Conducted security vulnerability checks across infrastructure to maintain high security standards.
* Performed cost-cutting research for AWS cloud resources, identifying and implementing strategies to optimize expenditure.

TATA CONSULTANCY SERVICES - Chennai, Tamil Nadu
Assistant System Engineer | August 2020 – November 2021
* Integrated CI/CD pipelines to automate build, test, and deployment processes for microservices, enhancing workflow efficiency.
* Configured and managed Kubernetes clusters for container orchestration and application deployment, ensuring reliable application performance.
* Automated preparation and configuration of testing platforms for IBM MQ software across cloud providers (AWS, Azure, IBM Cloud, GCP) and on-premise servers using Ansible and various tools, streamlining deployment processes.
* Built microservices into Docker images, facilitating containerization and deployment.

EDUCATION

CHENNAI INSTITUTE OF TECHNOLOGY - Chennai, Tamil Nadu
Bachelor of Engineering (BE) - Mechanical Engineering | January 2020

IIPE LAXMI RAMAN HIGHER SECONDARY SCHOOL - Chennai, Tamil Nadu
HSLC - Bio-Math | January 2016

CERTIFICATIONS
* Microsoft Certified: Azure Fundamentals (Ongoing)
* Containers and Kubernetes Essentials (IBM, Ongoing)
* IBM MQ Developer Essentials (IBM, Ongoing)
* Certified SolidWorks Associate (Dassault Systèmes, Ongoing)
* Python Programming (Various Courses, Ongoing)

ACTIVITIES & HONORS
* Volunteer: Dr. APJ Youth Club (Local community empowerment campaigns and volunteer work).
* Open Source Contribution: Contributor to JsonQ (a utility library for querying JSON data in Python/Golang).`,r=n.querySelector(".btn-text"),u=n.querySelector("i");n.addEventListener("click",async()=>{try{await navigator.clipboard.writeText(d),r&&(r.textContent="Copied"),u&&(u.setAttribute("data-lucide","check"),lucide.createIcons()),n.classList.remove("btn-secondary"),n.classList.add("btn-primary"),setTimeout(()=>{r&&(r.textContent="Copy ATS Text"),u&&(u.setAttribute("data-lucide","copy"),lucide.createIcons()),n.classList.remove("btn-primary"),n.classList.add("btn-secondary")},2e3)}catch(v){console.error("Failed to copy text: ",v)}})}function ze(){var ge,ve,fe,ye,he,be,ke,Ee,Ie,Ce,xe,Ae,we,Le,Se;const n=document.getElementById("lab-fullscreen-btn"),d=document.getElementById("interactive-lab");function r(){if(!d)return;d.classList.contains("fullscreen-active")?(d.classList.remove("fullscreen-active"),document.body.classList.remove("lab-fullscreen-open"),n&&(n.innerHTML='<i data-lucide="maximize-2"></i> <span>Fullscreen Mode</span>')):(d.classList.add("fullscreen-active"),document.body.classList.add("lab-fullscreen-open"),n&&(n.innerHTML='<i data-lucide="minimize-2"></i> <span>Exit Fullscreen</span>')),lucide.createIcons(),window.dispatchEvent(new Event("resize"))}n==null||n.addEventListener("click",r);const u=document.getElementById("launch-playground-btn");u==null||u.addEventListener("click",r),document.addEventListener("keydown",e=>{e.key==="Escape"&&(d!=null&&d.classList.contains("fullscreen-active"))&&r()});const v=document.querySelectorAll(".lab-nav-item"),f=document.querySelectorAll(".lab-pane");function h(e){v.forEach(t=>{const s=t.getAttribute("data-product")===e;t.classList.toggle("active",s),t.setAttribute("aria-selected",s?"true":"false")}),f.forEach(t=>{const s=t.getAttribute("id")===`pane-${e}`;t.classList.toggle("active",s)})}v.forEach(e=>{e.addEventListener("click",()=>{const t=e.getAttribute("data-product");h(t)})}),document.querySelectorAll(".overview-card").forEach(e=>{e.addEventListener("click",()=>{const t=e.getAttribute("data-card-product");t&&h(t)})}),document.querySelectorAll(".product-tab-btn").forEach(e=>{e.addEventListener("click",()=>{const t=e.closest(".lab-pane"),s=e.getAttribute("data-subtab");t.querySelectorAll(".product-tab-btn").forEach(a=>a.classList.remove("active")),e.classList.add("active"),t.querySelectorAll(".product-subpane").forEach(a=>{const o=a.getAttribute("data-subpane-id")===s;a.classList.toggle("active",o)})})});const y=document.getElementById("slackops-live-feed"),T=document.getElementById("slackops-workflow-history-rows");document.querySelectorAll("[data-slack-tab]").forEach(e=>{e.addEventListener("click",()=>{const t=e.closest(".console-playground-container")||e.closest(".fake-slack-shell");if(!t)return;const s=e.getAttribute("data-slack-tab");t.querySelectorAll("[data-slack-tab]").forEach(a=>a.classList.remove("active")),e.classList.add("active"),t.querySelectorAll(".slack-content-pane").forEach(a=>{const o=a.getAttribute("id")===`slack-tab-${s}`;a.classList.toggle("active",o)})})});function D(e){const t=document.getElementById(`modal-${e}`);t&&t.classList.remove("hidden")}function O(e){const t=document.getElementById(`modal-${e}`);t&&t.classList.add("hidden")}document.querySelectorAll("[data-action-trigger]").forEach(e=>{e.addEventListener("click",()=>{const t=e.getAttribute("data-action-trigger");if(t==="feature-toggle-btn"){h("govportal");const s=document.getElementById("govportal-form-item");s&&(s.value="toggle",s.dispatchEvent(new Event("change")))}else D(t)})}),(ge=document.getElementById("slackops-ops-req-btn"))==null||ge.addEventListener("click",()=>D("ops-request")),document.querySelectorAll("[data-close-modal]").forEach(e=>{e.addEventListener("click",()=>{const t=e.getAttribute("data-close-modal");O(t)})}),document.querySelectorAll(".slack-btn-modal-cancel").forEach(e=>{e.addEventListener("click",()=>{const t=e.closest(".slack-modal-overlay");t&&t.classList.add("hidden")})});function te(e,t){const s=Math.floor(1e3+Math.random()*9e3),a=document.createElement("tr");a.innerHTML=`
      <td>wf-${s}</td>
      <td>${e}</td>
      <td><span class="status-badge complete">Complete</span></td>
      <td>${t}</td>
      <td>Alex Rivera</td>
      <td>Just now</td>
    `,T&&T.insertBefore(a,T.firstChild)}function F(e,t,s){const a=y.querySelector(".console-feed-placeholder");a&&a.remove();const o=`wf-${Math.floor(1e3+Math.random()*9e3)}`,l=document.createElement("div");l.className="slack-card nextops-exec-card";let m="";t.forEach(A=>{m+=`
        <div class="slack-card-field">
          <span class="slack-card-field-label">${A.label}</span>
          <span class="slack-card-field-val">${A.val}</span>
        </div>
      `});const p=s.map((A,j)=>`<li class="nextops-step-item" data-step="${j}"><span class="nextops-step-icon"></span><span>${A.log}</span></li>`).join("");l.innerHTML=`
      <div class="slack-card-header">
        <i data-lucide="bolt" class="slack-card-icon" style="color:#4f46e5;"></i>
        <span class="slack-card-title-text">${e}</span>
        <span class="nextops-wf-id font-mono">${o}</span>
        <span class="status-pill status-pending">Pending</span>
      </div>
      <div class="slack-card-grid nextops-field-grid">
        ${m}
      </div>
      <ul class="nextops-step-list">${p}</ul>
      <div class="slack-progress-section">
        <span class="slack-progress-label">Progress: 0%</span>
        <div class="progress-bar-track">
          <div class="progress-bar-fill" style="width: 0%;"></div>
        </div>
      </div>
      <div class="slack-card-logs nextops-exec-logs">[00:00:00] Workflow worker initialized.</div>
      <div class="nextops-audit-note hidden" id="audit-${o}">
        <i data-lucide="clipboard-check"></i>
        <span>Logged to audit trail · operator Alex Rivera · demo mode</span>
      </div>
    `,y.prepend(l),y.scrollTop=0,lucide.createIcons();const c=l.querySelector(".slack-progress-label"),i=l.querySelector(".progress-bar-fill"),g=l.querySelector(".slack-card-logs"),k=l.querySelector(".status-pill"),x=l.querySelectorAll(".nextops-step-item"),S=l.querySelector(".nextops-audit-note");let I=0;const z=setInterval(()=>{if(I<s.length){k.textContent="In Progress",k.className="status-pill status-executing";const A=s[I],j=A.progress;c.textContent=`Progress: ${j}%`,i.style.width=`${j}%`;const Te=x[I];Te&&Te.classList.add("done"),g.innerHTML+=`
[00:00:${String(I+1).padStart(2,"0")}] ${A.log}`,g.scrollTop=g.scrollHeight,I++}else k.textContent="Complete",k.className="status-pill status-completed",c.textContent="Progress: 100%",i.style.width="100%",g.innerHTML+=`
[00:00:0${s.length+1}] Workflow ${o} committed successfully.`,S==null||S.classList.remove("hidden"),lucide.createIcons(),clearInterval(z),te(e,"3.0s")},1100)}const ae=document.getElementById("nextops-demo-date");ae&&(ae.textContent=new Date().toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric",year:"numeric"})),(ve=document.getElementById("submit-create-mongo-user"))==null||ve.addEventListener("click",()=>{const e=document.getElementById("form-mongo-pod").value,t=document.getElementById("form-mongo-jira").value,s=document.getElementById("form-mongo-org").value,a=document.getElementById("form-mongo-hours").value,o=document.getElementById("form-mongo-type").value;O("create-mongo-user"),F("Create Mongo User",[{label:"Target Pod",val:e},{label:"Jira Ticket",val:t},{label:"Org ID",val:s},{label:"Validity Hours",val:`${a} hours`},{label:"Role Clearance",val:o}],[{progress:25,log:"Validating inputs and RBAC clearance..."},{progress:55,log:"Verifying identity via Slack workspace token..."},{progress:85,log:"Provisioning Mongo user in target cluster..."},{progress:100,log:"Temporary credentials issued. Expiry timer started."}])}),(fe=document.getElementById("submit-terminate-job"))==null||fe.addEventListener("click",()=>{const e=document.getElementById("form-term-pod").value,t=document.getElementById("form-term-org").value,s=document.getElementById("form-term-jobid").value,a=document.getElementById("form-term-case").value;O("terminate-job"),F("Terminate Job",[{label:"Target Pod",val:e},{label:"Org ID",val:t},{label:"Job Instance",val:s},{label:"Support Case #",val:a}],[{progress:40,log:"Locating hung database processes for Org ID..."},{progress:75,log:"Sending SIGTERM to active job coordinator processes..."},{progress:100,log:"Job successfully terminated. Thread locks released."}])}),(ye=document.getElementById("submit-ops-request"))==null||ye.addEventListener("click",()=>{const e=document.getElementById("form-ops-jiralink").value,t=document.getElementById("form-ops-severity").value,s=document.getElementById("form-ops-component").value;O("ops-request"),F("Route Ops Request",[{label:"Jira Ref",val:e.substring(e.lastIndexOf("/")+1)},{label:"Severity Level",val:t},{label:"Component",val:s}],[{progress:30,log:"Parsing operational logs for component context..."},{progress:65,log:"Selecting best on-call staff in Active Shift (India)..."},{progress:100,log:"Incident details routed to Priya Nair. Alert acknowledged."}])});const Be=["[00:00:01] Querying cluster API namespaces for active workloads...","[00:00:02] Found 3 active jobs running in production namespace:","  - wf-governance-toggle-3829 (Status: RUNNING, Uptime: 45s)","  - wf-sre-pod-monitor-2201 (Status: RUNNING, Uptime: 12h 4m)","  - wf-rca-generator-rca-generator (Status: IDLE, Uptime: 3d)","[00:00:03] Workloads list fetched successfully. End of stream."],Re=["[00:00:01] Initializing Emergency Bug Fix (EBF) container rollover sequence...","[00:00:02] Target namespace: cloudstack-prod-use2-auth-service","[00:00:03] Deployment image tag set to: v2.4-stable-patch12","[00:00:04] Deploying replicas (container active)...","[00:00:05] [k8s] Pod auth-service-new-7fa82b created","[00:00:06] [k8s] Container auth-service-new-7fa82b started & healthcheck passed","[00:00:07] [k8s] Redirecting service selector routes to new replicas...","[00:00:08] [k8s] Terminating old pod auth-service-old-2b81fa","[00:00:09] EBF rolling deployment completed. 100% replicas verified stable."],Me=["[00:00:01] Requesting JVM stack trace for active containers...","[00:00:02] Connecting to pod cloudstack-prod-use2-auth-service-2b81fa...","[00:00:03] Thread Dump Time: 2026-06-13 15:32:00","[00:00:04] Found 142 active threads (118 RUNNABLE, 14 TIMED_WAITING, 10 BLOCKED).","[00:00:05] Threads blocked awaiting database pool lock:",'  - "http-nio-8080-exec-12" #48 daemon prio=5 os_prio=0 tid=0x00007f82ac003800 nid=0x2c waiting on condition',"    java.lang.Thread.State: BLOCKED (on object monitor)","    at com.zaxxer.hikari.pool.HikariPool.getConnection(HikariPool.java:182)","    at org.hibernate.engine.jdbc.connections.internal.DatasourceConnectionProviderImpl.getConnection(DatasourceConnectionProviderImpl.java:122)","[00:00:06] Thread dump analysis completed. Starved thread deadlock detected in connection pool."],Pe=["[00:00:01] Scanning cloudstack-prod-mongo-use2 for transaction lock bottlenecks...","[00:00:02] Active blocking transaction lock identified:","  - Blocking PID: 14820 (Granted: true)","  - Waiting PIDs: 14822, 14825, 14901","  - Query: UPDATE organizations SET status = 'active' WHERE org_id = 'org-acme-8842';","[00:00:03] Terminating blocking Postgres transaction PID 14820...","[00:00:04] Executing database signal command: SELECT pg_terminate_backend(14820);","[00:00:05] Database transaction lock successfully released. Blocked queue cleared."];(he=document.getElementById("slackops-rca-trigger"))==null||he.addEventListener("click",()=>{h("rcagen");const e=document.querySelector('#pane-rcagen .product-tab-btn[data-subtab="try-live"]');e==null||e.click();const t=document.querySelector('.opssage-process-btn[data-opssage-id="heap"]');t&&!t.disabled&&t.click()}),(be=document.getElementById("slackops-ssl-trigger"))==null||be.addEventListener("click",()=>{h("sreagent"),K("d")}),(ke=document.getElementById("slackops-infra-trigger"))==null||ke.addEventListener("click",()=>{h("sreagent"),K("a")}),(Ee=document.getElementById("slackops-running-trigger"))==null||Ee.addEventListener("click",()=>{$("Get Running Jobs",Be)}),(Ie=document.getElementById("slackops-ebf-trigger"))==null||Ie.addEventListener("click",()=>{$("Auto EBF",Re)}),(Ce=document.getElementById("slackops-threaddump-trigger"))==null||Ce.addEventListener("click",()=>{$("Take Thread Dump",Me)}),(xe=document.getElementById("slackops-dblock-trigger"))==null||xe.addEventListener("click",()=>{$("Release DB Lock",Pe)});function $(e,t){const s=y.querySelector(".console-feed-placeholder");s&&s.remove();const a=document.createElement("div");a.className="slack-card";const o=e.toLowerCase().replace(/\s+/g,"-");a.innerHTML=`
      <div class="slack-card-header">
        <i data-lucide="bolt" class="slack-card-icon" style="color:#4f46e5;"></i>
        <span class="slack-card-title-text">${e}</span>
        <span class="status-pill status-pending" id="slackops-task-status-${o}">RUNNING</span>
      </div>
      <div class="slack-card-logs" style="font-family: var(--font-mono); font-size: 0.75rem; white-space: pre-wrap; line-height: 1.4; color: #a1a1aa;"></div>
    `,y.appendChild(a),y.scrollTop=y.scrollHeight,lucide.createIcons();const l=a.querySelector(".slack-card-logs"),m=a.querySelector(".status-pill");let p=0;function c(){p<t.length?(l.innerHTML+=t[p]+`
`,p++,y.scrollTop=y.scrollHeight,setTimeout(c,350)):(m.textContent="COMPLETED",m.className="status-pill status-completed",te(e,`${(t.length*.35).toFixed(1)}s`))}setTimeout(c,200)}const C=document.getElementById("sreagent-chat-feed"),_=document.getElementById("sreagent-chat-input"),J=document.getElementById("sreagent-chat-send");function B(e,t,s=!1,a=""){const o=document.createElement("div");o.className=`slack-msg-row ${s?"user":"system"}`;const l=s?"user":"sparkles";return o.innerHTML=`
      <div class="slack-msg-avatar"><i data-lucide="${l}"></i></div>
      <div class="slack-msg-body">
        <span class="slack-msg-sender">${e}</span>
        <span class="slack-msg-time">Just now</span>
        <p class="chat-p-text">${t}</p>
        ${a}
      </div>
    `,C.appendChild(o),C.scrollTop=C.scrollHeight,lucide.createIcons(),o}function U(e){const t=document.createElement("div");return t.className="slack-msg-row system typing-indicator",t.innerHTML=`
      <div class="slack-msg-avatar"><i data-lucide="sparkles"></i></div>
      <div class="slack-msg-body">
        <span class="slack-msg-sender">Cosmic AI</span>
        <span class="slack-msg-time">Typing...</span>
        <p class="text-zinc-500 italic font-mono text-xs" style="margin:2px 0 0 0; display:flex; align-items:center;"><i data-lucide="refresh-cw" class="icon-spin mr-2" style="width:10px;height:10px;"></i>${e}</p>
      </div>
    `,C.appendChild(t),C.scrollTop=C.scrollHeight,lucide.createIcons(),t}function se(e,t,s){let a=0;e.innerHTML="";const o=setInterval(()=>{e.innerHTML+=t.charAt(a),a++,a>=t.length&&(clearInterval(o),s&&s()),C.scrollTop=C.scrollHeight},8)}const oe={pod2:`[pod2-status] Checking main environment: cloudstack-prod-use2
[pod2-status] Uptime: 42d 12h
[pod2-status] Kubernetes replica status: 1/1 Running
[pod2-status] CPU: 42%
[pod2-status] Memory: 92% (Heap thrashing warning)
[pod2-status] Error rate: 4.8% (Target SLA: <0.1%)
[pod2-status] Connection pool status: STARVING (Active: 49/50, Idle: 1, Queue: 12)`,"cpu-mem":`[check_cpu_memory] Executing docker stats query...
[check_cpu_memory] Node CPU utilization: 42% (Normal)
[check_cpu_memory] Physical Host Memory: 14.8GB / 16.0GB
[check_cpu_memory] Container JVM Max limit: 2048MB
[check_cpu_memory] JVM Resident Set Size (RSS): 1980MB (96.6% allocation)
[check_cpu_memory] Memory check passed with WARNING limit (Heap threshold exceeded)`,"jvm-gc":`[check_jvm_gc] Analyzing JVM garbage collector sweeps...
[check_jvm_gc] Garbage Collector: G1 Garbage Collector
[check_jvm_gc] Minor GC duration (avg): 140ms
[check_jvm_gc] Major GC sweeps in past hour: 28
[check_jvm_gc] Time spent in GC pause: 12s per minute (20% CPU overhead)
[check_jvm_gc] CRITICAL: Garbage collection thrashing detected. Heap memory exhausted.`,"db-pool":`[check_db_pool] Checking connection pool metadata...
[check_db_pool] Target database: cloudstack-prod-mongo-use2
[check_db_pool] Max connections: 50
[check_db_pool] Active connections: 49
[check_db_pool] Idle connections: 1
[check_db_pool] Average checkout wait time: 1480ms (SLA: <50ms)
[check_db_pool] WARNING: Connection pool starvation detected.`,"pool-starvation":`[db_pool_starvation] Root cause analyzer running...
[db_pool_starvation] Active client connections grouped by host IP:
  - 10.240.4.12: 18 connections (Active)
  - 10.240.4.13: 20 connections (Active)
  - 10.240.4.14: 11 connections (Active)
[db_pool_starvation] Queue length: 12 threads waiting for connection.
[db_pool_starvation] CRITICAL: Application threads are blocked waiting for DB connections. Scale maxPoolSize.`,"query-latency":`[slow_query_index_scan] Profiling database queries...
[slow_query_index_scan] Target collection: organizations
[slow_query_index_scan] Active query scans:
  - find({ orgId: "org-acme-8842" }) - Index scan: IXSCAN (Completed in 14ms)
  - find({ status: "active" }) - Collscan: COLLSCAN (Completed in 820ms)
[slow_query_index_scan] Query check completed: Index validation OK.`},Ne={a:{text:"pod2 is slow",response:"Analyzing cloudstack-prod-use2 pod2 performance. Initiating parallel SRE diagnostic checks...",followup:`Reasoning:
Latency spikes are caused by garbage collection thrashing under connection pool starvation.

Recommendation:
Scale JVM memory limits and expand Connection Pools via SSP governance.`,html:`
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
      `},b:{text:"delete mongo user testuser on pod2",response:"Request received: delete mongo user testuser on cloudstack-prod-use2. Performing security checks...",followup:"Awaiting Change Advisory Board approval block. Safe policy enforced.",html:`
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
      `},c:{text:"what did we discuss about pod2?",response:"Accessing Cosmic AI vector store for cloudstack-prod-use2 notes...",followup:`Memory Recall Search Results:
- June 12, 2026: SRE Team discussed JVM heap thrashing on pod2.
- Resolved temporarily by scaling heap config multiplier to 1.5x via NextOps (CHG-372104).
- Recommended action item: Optimize query indexes to reduce database table scan locks.`},d:{text:"check SSL for acme.com and search jira",response:"Executing combined SSL diagnostics and Jira issues search...",followup:`SSL Diagnostic results:
- Acme.com TLS certificate is VALID. Expires in 45 days (July 28, 2026).
- Encryption standard: TLS 1.3, SHA-256.

JIRA Search results:
- Found 1 related open ticket: CHG-372104 (Cloud Profiling timeouts).`}};function K(e){const t=Ne[e];if(!t)return;B("Alex Rivera",t.text,!0);const s=U("Cosmic AI is analyzing request parameters...");setTimeout(()=>{s.remove();const a=B("Cosmic AI",""),o=a.querySelector(".chat-p-text");se(o,t.response,()=>{if(t.html){const l=a.querySelector(".slack-msg-body"),m=document.createElement("div");if(m.innerHTML=t.html,l.appendChild(m),lucide.createIcons(),e==="a"){const p=m.querySelectorAll(".tree-node"),c=m.querySelector("#sre-log-node-name"),i=m.querySelector("#sre-log-content");p.forEach(g=>{g.addEventListener("click",()=>{var S;p.forEach(I=>I.classList.remove("active")),g.classList.add("active");const k=g.getAttribute("data-node"),x=((S=g.querySelector(".node-label"))==null?void 0:S.textContent)||k;if(c&&i&&oe[k]){c.textContent=x,i.textContent="";let I=0;const z=oe[k],A=setInterval(()=>{i.textContent+=z.charAt(I),I++,I>=z.length&&clearInterval(A),C.scrollTop=C.scrollHeight},4)}})})}if(e==="b"){const p=document.getElementById("sreagent-cab-approve-btn"),c=document.getElementById("sreagent-cab-reject-btn"),i=document.getElementById("sreagent-cab-card-status"),g=document.getElementById("sreagent-cab-actions");p==null||p.addEventListener("click",()=>{i.textContent="APPROVED",i.className="status-pill status-completed",g.remove(),B("Cosmic AI","Action approved. Running Mongo user deletion workflow. User testuser successfully removed from cloudstack-prod-use2.")}),c==null||c.addEventListener("click",()=>{i.textContent="DENIED",i.className="status-pill status-denied",g.remove(),B("Cosmic AI","Action denied. Operation cancelled.")})}}t.followup&&setTimeout(()=>{const l=U("Cosmic AI is reasoning...");setTimeout(()=>{l.remove();const p=B("Cosmic AI","").querySelector(".chat-p-text");let c=0;const i=setInterval(()=>{p.innerHTML+=t.followup.charAt(c),c++,c>=t.followup.length&&clearInterval(i),C.scrollTop=C.scrollHeight},6)},800)},600)})},1e3)}document.querySelectorAll(".slack-chip").forEach(e=>{e.addEventListener("click",()=>{const t=e.getAttribute("data-prompt-id");K(t)})}),J==null||J.addEventListener("click",ne),_==null||_.addEventListener("keydown",e=>{e.key==="Enter"&&ne()});function ne(){const e=_.value.trim();if(!e)return;_.value="",B("Alex Rivera",e,!0);const t=U("Parsing user request parameters...");setTimeout(()=>{t.remove();const a=B("Cosmic AI","").querySelector(".chat-p-text");se(a,`Received request: "${e}". I am a simulated agent interface. Please click one of the pre-defined suggestion chips above to demonstrate my automated SRE checks and memory recall capabilities!`)},1e3)}const W=document.getElementById("govportal-form-submit"),w=document.getElementById("govportal-form-item"),le=document.getElementById("govportal-toggle-fields"),ce=document.getElementById("govportal-view-form"),H=document.getElementById("govportal-view-jira"),R=document.getElementById("govportal-view-slack"),Q=document.getElementById("govportal-view-email");(Ae=document.getElementById("govportal-open-catalog-btn"))==null||Ae.addEventListener("click",()=>{D("govportal-catalog")});const ie=document.querySelectorAll(".catalog-cat-btn"),X=document.querySelectorAll(".catalog-item-card"),Y=document.getElementById("govportal-select-catalog-btn"),M=document.getElementById("catalog-search-input");function re(){const e=(M==null?void 0:M.value.toLowerCase())||"",t=document.querySelector(".catalog-cat-btn.active"),s=t?t.getAttribute("data-catalog-cat"):"all";X.forEach(a=>{var i,g;const o=((i=a.querySelector(".catalog-item-name"))==null?void 0:i.textContent.toLowerCase())||"",l=((g=a.querySelector(".catalog-item-desc"))==null?void 0:g.textContent.toLowerCase())||"",m=a.getAttribute("data-cat"),p=s==="all"||m===s,c=o.includes(e)||l.includes(e);p&&c?a.classList.remove("hidden"):a.classList.add("hidden")})}M==null||M.addEventListener("input",re),ie.forEach(e=>{e.addEventListener("click",()=>{ie.forEach(t=>t.classList.remove("active")),e.classList.add("active"),re()})}),X.forEach(e=>{e.addEventListener("click",()=>{X.forEach(t=>t.classList.remove("active")),e.classList.add("active")})}),Y==null||Y.addEventListener("click",()=>{var t;const e=document.querySelector(".catalog-item-card.active");if(e){const s=e.getAttribute("data-workflow-value"),a=((t=e.querySelector(".catalog-item-name"))==null?void 0:t.textContent)||"",o=document.getElementById("govportal-form-item-display");w&&o&&(w.value=s,o.value=a,w.dispatchEvent(new Event("change"))),O("govportal-catalog")}}),w==null||w.addEventListener("change",e=>{e.target.value==="toggle"?le.style.display="block":le.style.display="none"});const Z={1:document.getElementById("govportal-step-1"),2:document.getElementById("govportal-step-2"),3:document.getElementById("govportal-step-3"),4:document.getElementById("govportal-step-4"),5:document.getElementById("govportal-step-5")};function E(e,t,s=""){const a=Z[e];if(!a)return;a.className=`govportal-step ${t}`;const o=a.querySelector(".govportal-step-status");o&&s&&(o.textContent=s);const l=a.querySelector(".govportal-step-icon");t==="completed"?l.innerHTML='<i data-lucide="check" style="width:12px;height:12px;stroke-width:3px;"></i>':t==="current"?(l.innerHTML=e,l.style.backgroundColor="",l.style.borderColor=""):t==="failed"&&(l.innerHTML='<i data-lucide="x" style="width:12px;height:12px;stroke-width:3px;color:#ffffff;"></i>',l.style.backgroundColor="#dc2626",l.style.borderColor="#dc2626"),lucide.createIcons()}function de(){E(1,"current","Pending form inputs..."),E(2,"","Not started"),E(3,"","Not started"),E(4,"","Not started"),E(5,"","Not started");for(let e=2;e<=5;e++)Z[e]&&(Z[e].querySelector(".govportal-step-icon").innerHTML=e);ce.classList.add("active"),H.classList.remove("active"),R.classList.remove("active"),Q.classList.remove("active")}W==null||W.addEventListener("click",()=>{const e=w.value,t=document.getElementById("govportal-form-item-display").value,s=document.getElementById("govportal-form-pod").value,a=document.getElementById("govportal-form-org").value,o=document.getElementById("govportal-form-pmticket").value;E(1,"completed","Validated change request parameters."),ce.classList.remove("active"),H.classList.add("active");const l=document.getElementById("govportal-jira-key"),m=document.getElementById("govportal-jira-summary"),p=document.getElementById("govportal-jira-desc"),c=document.getElementById("govportal-jira-status");if(c.textContent="READY FOR CAB APPROVAL",c.className="jira-status-badge yellow",e==="toggle"){const i=document.getElementById("govportal-form-toggleid").value,g=document.getElementById("govportal-form-action").value,k=document.getElementById("govportal-form-value").value;l.textContent="CHG-50284",m.textContent=`[Cloud-SSP] Feature Toggle ${i} | Pod ${s} | Org ${a}`,p.textContent=`Governed Change Request submitted via SSP. Action: ${g} toggle ${i} to ${k}. Associated project manager validation ticket: ${o}.`}else if(e==="executor")l.textContent="CHG-50285",m.textContent=`[Cloud-SSP] Mongo Logs Export | Pod ${s} | Org ${a}`,p.textContent=`Governed Logs Export Request submitted via SSP. Target Org ID: ${a} on Pod ${s}. Associated PM security clearance ticket: ${o}.`;else{const i=Math.floor(1e5+Math.random()*9e5);l.textContent=`CHG-${i}`,m.textContent=`[Cloud-SSP] ${t} | Pod ${s} | Org ${a}`,p.textContent=`Governed change execution workflow "${t}" requested on namespace ${s} for tenant organization ${a}. Associated authorization reference ticket: ${o}.`}setTimeout(()=>{E(2,"completed","Jira change ticket generated."),E(3,"current","Awaiting CAB Approval check..."),H.classList.remove("active"),R.classList.add("active");const i=document.getElementById("govportal-slack-card-title"),g=document.getElementById("govportal-slack-card-grid"),k=document.getElementById("govportal-slack-actions-row"),x=document.getElementById("govportal-slack-card-status");if(x.textContent="AWAITING APPROVAL",x.className="status-pill status-pending",k.style.display="flex",e==="toggle"){const S=document.getElementById("govportal-form-toggleid").value,I=document.getElementById("govportal-form-value").value;i.textContent="Feature Toggle Request",g.innerHTML=`
          <div class="slack-card-field"><span class="slack-card-field-label">Action</span><span class="slack-card-field-val">Toggle Configuration</span></div>
          <div class="slack-card-field"><span class="slack-card-field-label">Toggle ID</span><span class="slack-card-field-val font-mono">${S}</span></div>
          <div class="slack-card-field"><span class="slack-card-field-label">Value</span><span class="slack-card-field-val">${I}</span></div>
          <div class="slack-card-field"><span class="slack-card-field-label">Pod Scope</span><span class="slack-card-field-val font-mono">${s}</span></div>
          <div class="slack-card-field"><span class="slack-card-field-label">PM Reference</span><span class="slack-card-field-val font-mono">${o}</span></div>
        `}else e==="executor"?(i.textContent="Mongo Logs Export",g.innerHTML=`
          <div class="slack-card-field"><span class="slack-card-field-label">Action</span><span class="slack-card-field-val">DB Export (Encrypted)</span></div>
          <div class="slack-card-field"><span class="slack-card-field-label">Target Pod</span><span class="slack-card-field-val font-mono">${s}</span></div>
          <div class="slack-card-field"><span class="slack-card-field-label">Target Org</span><span class="slack-card-field-val font-mono">${a}</span></div>
          <div class="slack-card-field"><span class="slack-card-field-label">PM Reference</span><span class="slack-card-field-val font-mono">${o}</span></div>
        `):(i.textContent=t,g.innerHTML=`
          <div class="slack-card-field"><span class="slack-card-field-label">Workflow</span><span class="slack-card-field-val">${t}</span></div>
          <div class="slack-card-field"><span class="slack-card-field-label">Target Pod</span><span class="slack-card-field-val font-mono">${s}</span></div>
          <div class="slack-card-field"><span class="slack-card-field-label">Target Org</span><span class="slack-card-field-val font-mono">${a}</span></div>
          <div class="slack-card-field"><span class="slack-card-field-label">Reference</span><span class="slack-card-field-val font-mono">${o}</span></div>
        `)},1500)}),(we=document.getElementById("govportal-slack-approve-btn"))==null||we.addEventListener("click",()=>{const e=document.getElementById("govportal-slack-card-status"),t=document.getElementById("govportal-slack-actions-row"),s=w.value;e.textContent="APPROVED",e.className="status-pill status-completed",t.style.display="none",E(3,"completed","CAB authorized change request."),E(4,"current","Applying changes in cluster..."),setTimeout(()=>{E(4,"completed","GitOps config synchronization complete."),E(5,"current","Dispatching deliverables..."),setTimeout(()=>{var c,i;E(5,"completed","Audit ledger compiled & notification emailed."),R.classList.remove("active"),Q.classList.add("active");const a=document.getElementById("govportal-email-subject"),o=Q.querySelector(".email-body"),l=document.getElementById("govportal-key-reveal-btn"),m=document.getElementById("govportal-fernet-key-display");l&&(l.disabled=!1,l.textContent="Reveal Key"),m&&(m.textContent="gAAAAABmX_k9R...");const p=document.getElementById("govportal-form-item-display").value;if(s==="toggle"){const g=document.getElementById("govportal-form-toggleid").value,k=document.getElementById("govportal-form-value").value,x=document.getElementById("govportal-form-pod").value;a.textContent="Completed: governed workflow wf-toggle Feature Toggle applied",o.innerHTML=`
            <div class="email-card-branding">
              <i data-lucide="shield-check" class="email-branding-icon"></i>
              <h4>Cloud Self Service Portal</h4>
            </div>
            <p>Governed feature toggle update completed successfully.</p>
            
            <div class="email-metrics-box">
              <div class="email-metric-row">
                <span class="email-metric-label">Toggle Reference:</span>
                <span class="font-mono text-zinc-100 font-bold">${g}</span>
              </div>
              <div class="email-metric-row">
                <span class="email-metric-label">New Value:</span>
                <span class="font-mono text-emerald-400 font-bold">${k}</span>
              </div>
              <div class="email-metric-row">
                <span class="email-metric-label">Target Infrastructure:</span>
                <span class="font-mono">${x}</span>
              </div>
            </div>

            <p class="text-zinc-400 text-xs">A GitOps pull request was automatically merged, updating target configurations. Pods on ${x} have been synchronized and successfully re-verified.</p>
            <button class="slack-btn-modal-cancel w-fit mt-4" id="govportal-btn-restart-demo">Start New Change Request</button>
          `}else if(s==="executor")document.getElementById("govportal-form-pod").value,a.textContent="Completed: governed workflow wf-logs-export Mongo logs export",o.innerHTML=`
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
          `,(c=document.getElementById("govportal-key-reveal-btn"))==null||c.addEventListener("click",()=>{const g=document.getElementById("govportal-fernet-key-display"),k=document.getElementById("govportal-key-reveal-btn");g&&k&&(g.textContent="gAAAAABmX_k9RzH3p7F4L2K9w5E1N3R9f8g0h2j4k6l8m0o2p4q6r8s0t2u4v6w8x9z==",k.disabled=!0,k.textContent="Copied")});else{const g=document.getElementById("govportal-form-pod").value;a.textContent=`Completed: governed workflow wf-generic ${p} executed`,o.innerHTML=`
            <div class="email-card-branding">
              <i data-lucide="shield-check" class="email-branding-icon"></i>
              <h4>Cloud Self Service Portal</h4>
            </div>
            <p>Governed change request for <strong>${p}</strong> completed successfully.</p>
            
            <div class="email-metrics-box">
              <div class="email-metric-row">
                <span class="email-metric-label">Workflow:</span>
                <span class="font-mono text-zinc-100 font-bold">${p}</span>
              </div>
              <div class="email-metric-row">
                <span class="email-metric-label">Target Pod:</span>
                <span class="font-mono">${g}</span>
              </div>
              <div class="email-metric-row">
                <span class="email-metric-label">Audit Log Ref:</span>
                <span class="font-mono text-emerald-400 font-bold">wf-${Math.floor(1e3+Math.random()*9e3)}</span>
              </div>
            </div>

            <p class="text-zinc-400 text-xs">Governed actions were successfully completed and logged in the immutable security ledger. Deployment states were verified automatically and marked stable.</p>
            <button class="slack-btn-modal-cancel w-fit mt-4" id="govportal-btn-restart-demo">Start New Change Request</button>
          `}(i=document.getElementById("govportal-btn-restart-demo"))==null||i.addEventListener("click",de),lucide.createIcons()},1500)},1500)}),(Le=document.getElementById("govportal-slack-reject-btn"))==null||Le.addEventListener("click",()=>{const e=document.getElementById("govportal-slack-card-status"),t=document.getElementById("govportal-slack-actions-row");e.textContent="REJECTED",e.className="status-pill status-denied",t.style.display="none",E(3,"failed","CAB Approval Denied.");const s=document.getElementById("govportal-jira-status");s&&(s.textContent="CANCELLED / REJECTED",s.className="jira-status-badge red");const a=document.createElement("div");a.className="govportal-rollback-log",a.style.marginTop="15px",a.style.padding="12px",a.style.background="#18181b",a.style.border="1px solid #dc2626",a.style.borderRadius="var(--radius-sm)",a.style.fontFamily="var(--font-mono)",a.style.fontSize="0.75rem",a.innerHTML=`
      <div style="color: #ef4444; font-weight: bold; border-bottom: 1px solid rgba(220, 38, 38, 0.3); padding-bottom: 6px; margin-bottom: 8px; display: flex; align-items: center; gap: 6px;">
        <i data-lucide="shield-alert" style="width: 14px; height: 14px;"></i> AUTOMATED GITOPS ROLLBACK IN PROGRESS
      </div>
      <div class="rollback-lines" style="color: #a1a1aa; line-height: 1.4; max-height: 120px; overflow-y: auto;">
        [system] CAB rejection event received. Aborting change pipeline...<br>
      </div>
    `,R.appendChild(a),lucide.createIcons();const o=["[gitops] Reverting configuration pull request...","[gitops] Restoring replica configuration hashes to parent target standard...","[k8s] Triggering health verification on target namespace...","[system] Rollback check complete. Cluster status: stable. Zero configurations altered.","[jira] Updated ticket status to CANCELLED."],l=a.querySelector(".rollback-lines");let m=0;function p(){var c;if(m<o.length)l.innerHTML+=`${o[m]}<br>`,m++,setTimeout(p,400);else{const i=document.createElement("div");i.innerHTML='<button class="slack-btn-modal-cancel w-fit mt-4" id="govportal-btn-restart-demo">Start New Change Request</button>',R.appendChild(i),(c=document.getElementById("govportal-btn-restart-demo"))==null||c.addEventListener("click",()=>{a.remove(),i.remove(),de()})}}setTimeout(p,400)}),(Se=document.getElementById("govportal-slack-open-jira"))==null||Se.addEventListener("click",()=>{R.classList.remove("active"),H.classList.add("active")});const pe=document.querySelectorAll("[data-rcagen-tab]"),qe=document.querySelectorAll(".rcagen-content-pane");pe.forEach(e=>{e.addEventListener("click",()=>{const t=e.getAttribute("data-rcagen-tab");pe.forEach(s=>s.classList.remove("active")),e.classList.add("active"),qe.forEach(s=>{const a=s.getAttribute("id")===`rcagen-tab-${t}`;s.classList.toggle("active",a)})})});const De={heap:{title:"heap-scale-v2 · JVM heap above 90%",steps:["Alert matched to runbook heap-scale-v2","Validate: single pod spike confirmed on cloudstack-prod-use2","Validate: no active deployment in progress","Validate: heap trend sustained &gt; 5 minutes","Execute: SSP workflow wf-heap-scale (JVM multiplier 1.5x)","Notify: Slack summary posted to #cloudstack-ops-alerts"],result:"Complete — heap reduced to 45% baseline. On-call not paged.",actionLog:{alert:"JVM heap utilization above 90%",action:"heap-scale-v2",pod:"cloudstack-prod-use2"}},latency:{title:"conn-pool-scale · API latency p99 high",steps:["Alert matched to runbook conn-pool-scale","Validate: DB connection pool at capacity (100/100)","Validate: no open Sev-1 incidents","Execute: scale pool ConfigMap 100 → 200","Execute: rolling restart auth-service pods","Notify: latency p99 back under 120ms"],result:"Complete — connection pool scaled. On-call not paged.",actionLog:{alert:"API latency p99 &gt; 2500ms",action:"conn-pool-scale",pod:"cloudstack-prod-use2"}},disk:{title:"log-rotate-sweep · disk usage high",steps:["Alert matched to runbook log-rotate-sweep","Validate: growth is log volume, not data disk","Validate: node pool cloudstack-prod-apse1 healthy","Execute: log rotation job triggered on worker pool","Notify: disk usage reduced to 62%"],result:"Complete — log sweep finished. On-call not paged.",actionLog:{alert:"Disk usage &gt; 85% on worker pool",action:"log-rotate-sweep",pod:"cloudstack-prod-apse1"}}},ee=document.getElementById("opssage-progress-panel"),ue=document.getElementById("opssage-progress-title"),L=document.getElementById("opssage-progress-status"),G=document.getElementById("opssage-checklist"),P=document.getElementById("opssage-progress-bar"),N=document.getElementById("opssage-progress-log"),me=document.getElementById("opssage-action-log-body");document.querySelectorAll(".opssage-process-btn").forEach(e=>{e.addEventListener("click",()=>{const t=e.getAttribute("data-opssage-id"),s=De[t];if(!s||e.disabled)return;e.disabled=!0;const a=document.getElementById(`opssage-status-${t}`);a&&(a.textContent="Processing",a.className="status-pill status-pending"),ee==null||ee.classList.remove("hidden"),ue&&(ue.textContent=s.title),L&&(L.textContent="VALIDATING",L.className="status-pill status-pending"),G&&(G.innerHTML=""),P&&(P.style.width="0%"),N&&(N.textContent="Starting validation pipeline...");let o=0;const l=s.steps.length,m=()=>{if(o>=l){if(L&&(L.textContent="COMPLETE",L.className="status-pill status-completed"),P&&(P.style.width="100%"),N&&(N.textContent=s.result),a&&(a.textContent="Resolved",a.className="status-pill status-completed"),me&&s.actionLog){const c=document.createElement("tr");c.innerHTML=`
              <td class="font-mono text-xs">${new Date().toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",timeZone:"UTC"})} UTC</td>
              <td>${s.actionLog.alert}</td>
              <td class="font-mono text-xs">${s.actionLog.action}</td>
              <td><span class="foundation-badge m-0">${s.actionLog.pod}</span></td>
              <td><span class="status-badge complete">Complete</span></td>
              <td>No</td>
            `,me.prepend(c)}return}if(G){const c=document.createElement("div");c.className="opssage-check-item",c.innerHTML=`<span class="opssage-check-icon pending"></span><span>${s.steps[o]}</span>`,G.appendChild(c),setTimeout(()=>{var i;(i=c.querySelector(".opssage-check-icon"))==null||i.classList.replace("pending","done")},400)}const p=Math.round((o+1)/l*100);P&&(P.style.width=`${p}%`),N&&(N.textContent=s.steps[o]),o>=2&&L&&(L.textContent="EXECUTING"),o++,setTimeout(m,900)};setTimeout(m,300)})})}function je(){const n=document.getElementById("logo-status-text");if(!n)return;const d=[{text:"ai_systems",type:"success"},{text:"agent_orchestration",type:"active"},{text:"llms_and_agents",type:"success"},{text:"temporal_workflows",type:"active"},{text:"kubernetes",type:"active"},{text:"terraform",type:"active"},{text:"ai_automation",type:"success"},{text:"chatops",type:"success"},{text:"devops_sre",type:"success"}];let r=0;const u=f=>new Promise(h=>setTimeout(h,f));(async()=>{for(await u(1e3);;){r=(r+1)%d.length;const f=d[r];n.className="logo-status status-active";let h=n.textContent;for(;h.length>0;)h=h.slice(0,-1),n.textContent=h,await u(20);await u(80);let q=f.text;for(let b=0;b<q.length;b++)n.textContent+=q[b],await u(35);n.className="logo-status",f.type==="active"&&n.classList.add("status-active"),await u(1e3)}})()}

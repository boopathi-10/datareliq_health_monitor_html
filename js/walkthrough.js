/* ================================================================
   DataReliQ Health Monitor — Interactive Walkthrough Guide
   Step-by-step guided tour highlighting UI elements
   ================================================================ */

(function () {
    'use strict';

    /* ── Walkthrough Step Definitions ───────────────────────────── */
    const STEPS_FRESHNESS = [
        {
            target: '.sidebar-nav',
            title: 'Navigation',
            text: 'Navigate between different monitoring modules — Data Freshness, Performance & SLA, Pipeline Monitor, Logs, Reports, and Settings.',
            position: 'right',
        },
        // {
        //     target: '#timeRange',
        //     title: 'Time Range',
        //     text: 'Select the analysis window — choose from 24 Hours, 7 Days, 30 Days, or 90 Days to adjust all metrics and charts.',
        //     position: 'bottom',
        // },
        // {
        //     target: '#btnRefresh',
        //     title: 'Refresh',
        //     text: 'Refresh the current page to reload the latest data from Snowflake.',
        //     position: 'bottom',
        // },
        {
            target: '#btnReports',
            title: 'Reports',
            text: 'Navigate to the Reports page to generate, download, and email PDF reports.',
            position: 'bottom',
        },
        {
            target: '#btnCompute',
            title: 'Compute',
            text: 'Trigger an on-demand freshness scan across all monitored tables. Results update automatically once the scan completes.',
            position: 'bottom',
        },
        {
            target: '.kpi-row .kpi-col:nth-child(1) .custom-kpi-card',
            title: 'Freshness Score',
            text: 'A 0–100 health score showing how up-to-date your data is. 100 means all tables were updated exactly as scheduled.',
            position: 'bottom',
        },
        {
            target: '.kpi-row .kpi-col:nth-child(2) .custom-kpi-card',
            title: 'Tables At Risk',
            text: 'The count of tables where the Freshness Score has dropped below threshold. These tables are approaching their overdue limit.',
            position: 'bottom',
        },
        {
            target: '.kpi-row .kpi-col:nth-child(3) .custom-kpi-card',
            title: 'Most Stale Table',
            text: 'The specific table currently furthest behind its expected update schedule, measured in hours.',
            position: 'bottom',
        },
        {
            target: '.chart-col-small .st-container',
            title: 'Score Distribution',
            text: 'Visual breakdown of tables by health status — Healthy (80+), Warning (50–79), and Critical (<50). Hover a segment for details.',
            position: 'right',
        },
        {
            target: '.chart-col-large .st-container',
            title: 'Freshness Trend',
            text: 'Tracks your average Freshness Score over the selected time period. Use this to identify recurring windows of delay.',
            position: 'left',
        },
        {
            target: '#tablesMonitored',
            title: 'Tables Monitored',
            text: 'Detailed view of all monitored tables with their freshness metrics — staleness hours, last update time, and health status.',
            position: 'top',
            scrollTarget: '.section-header-row',
        },
        {
            target: '#staleTrendChart',
            title: 'Stale Table Trend',
            text: 'Compare overdue hours for a selected table against its expected refresh interval. The red dashed line shows the target.',
            position: 'top',
        },
        {
            target: '#btnComputeNow',
            title: 'Compute Now',
            text: 'Run a freshness scan on demand from anywhere in the application. Results appear once the scan completes.',
            position: 'right',
        },
        // {
        //     target: '#btnSupport',
        //     title: 'Support',
        //     text: 'Support',
        //     position: 'right',
        // },
    ];

    const STEPS_SLA = [
        {
            target: '#slaKpiRow .kpi-col:nth-child(1) .custom-kpi-card',
            text: 'UPTIME SLA: Measures the percentage of time the database and compute warehouses have been available.',
            position: 'bottom',
        },
        {
            target: '#slaKpiRow .kpi-col:nth-child(2) .custom-kpi-card',
            text: 'FRESHNESS SLA: Measures the percentage of tables that have met their expected refresh intervals.',
            position: 'bottom',
        },
        {
            target: '#slaKpiRow .kpi-col:nth-child(3) .custom-kpi-card',
            text: 'QUERY SUCCESS RATE: The percentage of successful queries out of the last 100 executed queries.',
            position: 'bottom',
        },
        {
            target: '#slaTrendContainer',
            text: 'SLA Trend Chart: Visualizes the historical performance of your SLAs. You can switch between Freshness SLA and Uptime SLA.',
            position: 'bottom',
        },
        {
            target: '#recentQueriesContainer',
            text: 'Recent Queries: A detailed log of recently executed queries, including their duration and success status.',
            position: 'top',
        },
    ];

    const STEPS_PIPELINE = [
        {
            target: '#pipelineKpiRow .kpi-col:nth-child(1) .custom-kpi-card',
            text: 'TOTAL PIPELINES: The total number of data pipelines monitored by DataReliQ.',
            position: 'bottom',
        },
        {
            target: '#pipelineKpiRow .kpi-col:nth-child(2) .custom-kpi-card',
            text: 'ACTIVE PIPELINES: Indicates the number of pipelines currently running successfully.',
            position: 'bottom',
        },
        {
            target: '#pipelineKpiRow .kpi-col:nth-child(3) .custom-kpi-card',
            text: 'SUCCESSFUL PIPELINES: Tracks the overall success rate of your pipeline executions.',
            position: 'bottom',
        },
        {
            target: '#pipelineKpiRow .kpi-col:nth-child(4) .custom-kpi-card',
            text: 'FAILED PIPELINES: Highlights pipelines that have failed during this period.',
            position: 'bottom',
        },
        {
            target: '#pipelineSuccessContainer',
            text: 'Task Success Rate: Displays daily success and failure counts for pipeline tasks.',
            position: 'bottom',
        },
        {
            target: '#pipelineErrorContainer',
            text: 'Error Breakdown: Categorizes pipeline failures so you can quickly identify the root causes.',
            position: 'bottom',
        },
        {
            target: '#topFailingTasksContainer',
            text: 'Top Failing Tasks: A detailed log of the most problematic pipeline tasks, including error messages to help you debug.',
            position: 'top',
        },
    ];

    const STEPS_LOGS_EXECUTION = [
        {
            target: '.st-tabs',
            text: 'Logs Navigation: Use these tabs to easily switch between system Execution Logs and Notification Alerts.',
            position: 'bottom',
        },
        {
            target: '#tab-execution .section-header-row > div:nth-child(2)',
            text: 'Log Filters: Narrow down your execution history by Module, Time Range, Scan Type, and Status.',
            position: 'bottom',
        },
        {
            target: '#executionTableContainer',
            text: 'Execution Logs Table: View a detailed ledger of all backend events, query durations, and final statuses.',
            position: 'top',
        },
        {
            target: '#executionPagination',
            text: 'Pagination controls: Navigate backwards through your historical application logs.',
            position: 'top',
        },
    ];

    const STEPS_LOGS_NOTIFICATIONS = [
        {
            target: '.st-tabs',
            text: 'Logs Navigation: Use these tabs to easily switch between system Execution Logs and Notification Alerts.',
            position: 'bottom',
        },
        {
            target: '#tab-notifications .section-header-row > div:nth-child(2)',
            text: 'Notification Filters: Filter alerts based on their delivery status.',
            position: 'bottom',
        },
        {
            target: '#notificationsTableContainer',
            text: 'Notifications Table: Review a history of all email alerts sent, including detailed error logs for failures.',
            position: 'top',
        },
        {
            target: '#notificationsPagination',
            text: 'Pagination controls: Browse through older notification records.',
            position: 'top',
        },
    ];

    const STEPS_REPORTS = [
        {
            target: '#btnNewReport',
            text: 'New Report: Click here to instantly generate or schedule a new custom report.',
            position: 'left',
        },
        {
            target: '#page-reports .section-header-row > div:nth-child(2)',
            text: 'Report Filters: Filter your downloaded reports by specific modules.',
            position: 'bottom',
        },
        {
            target: '#reportsTableContainer',
            text: 'Downloads Table: Access your previously generated reports. Click the download icon to save them locally.',
            position: 'top',
        },
        {
            target: '#reportsPagination',
            text: 'Pagination controls: Browse through your older generated reports.',
            position: 'top',
        },
    ];

    const STEPS_SETTINGS = [
        {
            target: '#page-settings > div:nth-child(2)',
            text: 'Connection Status: Verify your Snowflake connection, current region, and the last time Datareliq synced its configurations.',
            position: 'bottom',
        },
        {
            target: '#accordion-connection summary',
            text: 'Connection Settings: Expand to view and manage the specific Snowflake databases and schemas Datareliq has access to.',
            position: 'bottom',
        },
        {
            target: '#accordion-configuration summary',
            text: 'Module Configuration: Click to edit the underlying thresholds, SLA targets, and intervals for your data freshness and performance modules.',
            position: 'bottom',
        },
        {
            target: '#accordion-email summary',
            text: 'Alert Integration: Configure which Snowflake roles or specific email addresses receive automated failure alerts.',
            position: 'bottom',
        },
        {
            target: '#page-settings details:last-child summary',
            text: "Data Access & Privacy: View exactly which views are being monitored, access cleanup scripts, and review Datareliq's strict read-only guarantees.",
            position: 'top',
        },
    ];

    let currentSteps = [];
    let currentStep = 0;
    let overlayEl = null;
    let tooltipEl = null;
    let highlightEl = null;
    let isActive = false;

    /* ── Create DOM Elements ────────────────────────────────────── */
    function createOverlay() {
        // Overlay backdrop
        overlayEl = document.createElement('div');
        overlayEl.className = 'wt-overlay';
        overlayEl.id = 'wtOverlay';
        document.body.appendChild(overlayEl);

        // Highlight ring
        highlightEl = document.createElement('div');
        highlightEl.className = 'wt-highlight';
        highlightEl.id = 'wtHighlight';
        document.body.appendChild(highlightEl);

        // Tooltip
        tooltipEl = document.createElement('div');
        tooltipEl.className = 'wt-tooltip';
        tooltipEl.id = 'wtTooltip';
        tooltipEl.innerHTML = `
            <p class="wt-tooltip-text" id="wtText"></p>
            <div class="wt-tooltip-actions">
                <button class="wt-btn wt-btn-exit" id="wtBtnExit">Exit</button>
                <div class="wt-btn-group">
                    <button class="wt-btn wt-btn-prev" id="wtBtnPrev">Prev</button>
                    <button class="wt-btn wt-btn-next" id="wtBtnNext">Next</button>
                </div>
            </div>
        `;
        document.body.appendChild(tooltipEl);

        // Event listeners
        document.getElementById('wtBtnNext').addEventListener('click', nextStep);
        document.getElementById('wtBtnPrev').addEventListener('click', prevStep);
        document.getElementById('wtBtnExit').addEventListener('click', endTour);
        overlayEl.addEventListener('click', endTour);

        // Keyboard navigation
        document.addEventListener('keydown', handleKeydown);
    }

    function handleKeydown(e) {
        if (!isActive) return;
        if (e.key === 'Escape') endTour();
        if (e.key === 'ArrowRight' || e.key === 'Enter') nextStep();
        if (e.key === 'ArrowLeft') prevStep();
    }

    /* ── Tour Controls ──────────────────────────────────────────── */
    function startTour() {
        if (isActive) return;

        // Determine which page is active
        const activePageId = document.querySelector('.page-view.active')?.id;
        if (activePageId === 'page-sla') {
            currentSteps = STEPS_SLA;
        } else if (activePageId === 'page-pipeline') {
            currentSteps = STEPS_PIPELINE;
        } else if (activePageId === 'page-logs') {
            const isExecutionActive = document.getElementById('tab-execution').style.display !== 'none';
            currentSteps = isExecutionActive ? STEPS_LOGS_EXECUTION : STEPS_LOGS_NOTIFICATIONS;
        } else if (activePageId === 'page-reports') {
            currentSteps = STEPS_REPORTS;
        } else if (activePageId === 'page-settings') {
            currentSteps = STEPS_SETTINGS;
        } else {
            currentSteps = STEPS_FRESHNESS;
        }

        isActive = true;
        currentStep = 0;
        createOverlay();
        showStep(currentStep);
    }

    function endTour() {
        if (!isActive) return;
        isActive = false;

        // Remove elements
        if (overlayEl) overlayEl.remove();
        if (tooltipEl) tooltipEl.remove();
        if (highlightEl) highlightEl.remove();
        overlayEl = null;
        tooltipEl = null;
        highlightEl = null;

        document.removeEventListener('keydown', handleKeydown);

        // Reset any elevated z-index on targets
        document.querySelectorAll('.wt-target-elevated').forEach(el => {
            el.classList.remove('wt-target-elevated');
        });
    }

    function nextStep() {
        if (currentStep < currentSteps.length - 1) {
            currentStep++;
            showStep(currentStep);
        } else {
            endTour();
        }
    }

    function prevStep() {
        if (currentStep > 0) {
            currentStep--;
            showStep(currentStep);
        }
    }

    /* ── Render Current Step ────────────────────────────────────── */
    function showStep(idx) {
        const step = currentSteps[idx];
        const targetEl = document.querySelector(step.target);

        if (!targetEl) {
            // Skip missing targets
            if (idx < currentSteps.length - 1) { currentStep++; showStep(currentStep); }
            else endTour();
            return;
        }

        // Clear previous elevation
        document.querySelectorAll('.wt-target-elevated').forEach(el => {
            el.classList.remove('wt-target-elevated');
        });

        // Scroll target into view
        const scrollEl = step.scrollTarget ? document.querySelector(step.scrollTarget) : targetEl;
        scrollEl.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Wait for scroll to settle, then position
        setTimeout(() => {
            positionHighlight(targetEl);
            positionTooltip(targetEl, step);
            updateTooltipContent(step, idx);
            targetEl.classList.add('wt-target-elevated');
        }, 350);
    }

    /* ── Positioning ────────────────────────────────────────────── */
    function positionHighlight(el) {
        const rect = el.getBoundingClientRect();
        const padding = 8;
        highlightEl.style.top = (rect.top - padding) + 'px';
        highlightEl.style.left = (rect.left - padding) + 'px';
        highlightEl.style.width = (rect.width + padding * 2) + 'px';
        highlightEl.style.height = (rect.height + padding * 2) + 'px';
    }

    function positionTooltip(el, step) {
        const rect = el.getBoundingClientRect();
        const tt = tooltipEl;
        const padding = 16;
        const tooltipWidth = 340;

        // Reset position
        tt.style.top = '';
        tt.style.left = '';
        tt.style.right = '';
        tt.style.bottom = '';
        tt.style.maxWidth = tooltipWidth + 'px';

        let top, left;

        switch (step.position) {
            case 'right':
                top = rect.top + rect.height / 2;
                left = rect.right + padding;
                // If tooltip overflows right edge, flip to left
                if (left + tooltipWidth > window.innerWidth) {
                    left = rect.left - tooltipWidth - padding;
                }
                tt.style.top = top + 'px';
                tt.style.left = left + 'px';
                tt.style.transform = 'translateY(-50%)';
                break;

            case 'left':
                top = rect.top + rect.height / 2;
                left = rect.left - tooltipWidth - padding;
                if (left < 0) {
                    left = rect.right + padding;
                }
                tt.style.top = top + 'px';
                tt.style.left = left + 'px';
                tt.style.transform = 'translateY(-50%)';
                break;

            case 'bottom':
                top = rect.bottom + padding;
                left = rect.left + rect.width / 2 - tooltipWidth / 2;
                if (left < 10) left = 10;
                if (left + tooltipWidth > window.innerWidth - 10) left = window.innerWidth - tooltipWidth - 10;
                tt.style.top = top + 'px';
                tt.style.left = left + 'px';
                tt.style.transform = 'none';
                break;

            case 'top':
                // Get tooltip height estimate
                top = rect.top - padding;
                left = rect.left + rect.width / 2 - tooltipWidth / 2;
                if (left < 10) left = 10;
                if (left + tooltipWidth > window.innerWidth - 10) left = window.innerWidth - tooltipWidth - 10;
                tt.style.top = top + 'px';
                tt.style.left = left + 'px';
                tt.style.transform = 'translateY(-100%)';
                break;

            default:
                top = rect.bottom + padding;
                left = rect.left;
                tt.style.top = top + 'px';
                tt.style.left = left + 'px';
                tt.style.transform = 'none';
        }
    }

    function updateTooltipContent(step, idx) {
        document.getElementById('wtText').textContent = step.text;

        // Prev button visibility
        const prevBtn = document.getElementById('wtBtnPrev');
        prevBtn.style.display = idx === 0 ? 'none' : 'block';

        // Next button text
        const nextBtn = document.getElementById('wtBtnNext');
        nextBtn.textContent = idx === currentSteps.length - 1 ? 'Finish' : 'Next';
    }

    /* ── Auto-resize handler ────────────────────────────────────── */
    window.addEventListener('resize', () => {
        if (!isActive) return;
        const step = currentSteps[currentStep];
        const targetEl = document.querySelector(step.target);
        if (targetEl) {
            positionHighlight(targetEl);
            positionTooltip(targetEl, step);
        }
    });

    /* ── Expose start function globally ─────────────────────────── */
    window.startWalkthrough = startTour;

})();

/* ================================================================
   DataReliQ Health Monitor — Demo Version JS
   Navigation, Chart rendering, and page interactivity
   ================================================================ */

document.addEventListener('DOMContentLoaded', () => {
    Chart.defaults.font.family = "'Source Sans Pro', sans-serif";
    initNavigation();
    initRadioGroups();
    initCharts();
});

/* ================================================================
   SIDEBAR NAVIGATION
   ================================================================ */
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-radio-item');
    const pageViews = document.querySelectorAll('.page-view');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const target = item.querySelector('input[type="radio"]').value;

            // Update active nav
            navItems.forEach(n => n.classList.remove('active'));
            item.classList.add('active');
            item.querySelector('input[type="radio"]').checked = true;

            // Show/hide pages
            pageViews.forEach(p => p.classList.remove('active'));
            const targetPage = document.getElementById(`page-${target}`);
            if (targetPage) {
                targetPage.classList.add('active');
            }
        });
    });

    // Global listener for Reports buttons
    document.querySelectorAll('button').forEach(btn => {
        if (btn.innerText.trim() === 'Reports') {
            btn.addEventListener('click', () => {
                const reportNav = document.querySelector('.nav-radio-item input[value="reports"]');
                if (reportNav && reportNav.parentElement) {
                    reportNav.parentElement.click();
                }
            });
        }
    });
}

/* ================================================================
   RADIO GROUP INTERACTIONS
   ================================================================ */
function initRadioGroups() {
    const viewRadios = document.querySelectorAll('.st-radio');
    viewRadios.forEach(radio => {
        radio.addEventListener('click', () => {
            const group = radio.closest('.radio-group');
            group.querySelectorAll('.st-radio').forEach(r => r.classList.remove('active'));
            radio.classList.add('active');
            radio.querySelector('input[type="radio"]').checked = true;
        });
    });
}

/* ================================================================
   CHARTS — Chart.js
   ================================================================ */
function initCharts() {
    renderScoreDistChart();
    renderFreshnessTrendChart();
    renderStaleTrendChart();
    renderSlaTrendChart();
    renderPipelineSuccessChart();
    renderPipelineErrorChart();
}

/* ── Score Distribution (Donut Chart) ───────────────────────────── */
function renderScoreDistChart() {
    const ctx = document.getElementById('scoreDistChart');
    if (!ctx) return;

    // Detailed metadata per segment for rich hover tooltips
    const segmentMeta = {
        'Critical': { count: 2, avgScore: 23.3, tables: ['EMPLOYEES', 'INVENTORY_LEVELS'] },
        'Healthy': { count: 1, avgScore: 95.0, tables: ['DEPARTMENTS'] },
        'Warning': { count: 1, avgScore: 62.5, tables: ['CUSTOMERS'] },
    };

    new Chart(ctx, {
        type: 'doughnut',
        plugins: [ChartDataLabels],
        data: {
            labels: ['Critical', 'Healthy', 'Warning'],
            datasets: [{
                data: [25, 25, 50],
                backgroundColor: ['#ef4444', '#059669', '#f59e0b'],
                borderWidth: 0,
                hoverOffset: 8,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '40%',
            plugins: {
                datalabels: {
                    color: '#ffffff',
                    font: {
                        family: "'Source Sans Pro', sans-serif",
                        weight: '600',
                        size: 14,
                    },
                    formatter: function(value, context) {
                        const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
                        const pct = Math.round((value / total) * 100);
                        return pct + '%';
                    },
                    anchor: 'center',
                    align: 'center',
                },
                legend: {
                    display: true,
                    position: 'top',
                    align: 'center',
                    labels: {
                        usePointStyle: true,
                        pointStyle: 'rectRounded',
                        boxWidth: 12,
                        boxHeight: 12,
                        padding: 16,
                        font: {
                            family: "'Source Sans Pro', sans-serif",
                            size: 13,
                        },
                        color: '#0f172a',
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    titleColor: '#0f172a',
                    bodyColor: '#475569',
                    borderColor: 'rgba(128,128,128,0.3)',
                    borderWidth: 1,
                    cornerRadius: 8,
                    padding: 12,
                    titleFont: { family: "'Source Sans Pro', sans-serif", weight: '700', size: 14 },
                    bodyFont: { family: "'Source Sans Pro', sans-serif", size: 12 },
                    bodySpacing: 4,
                    displayColors: false,
                    callbacks: {
                        title: function(items) {
                            return items[0].label;
                        },
                        label: function(context) {
                            const label = context.label;
                            const meta = segmentMeta[label];
                            if (!meta) return `${context.parsed}%`;
                            return [
                                `Count: ${meta.count}`,
                                `Avg Score: ${meta.avgScore.toFixed(1)}`,
                                `Tables: ${meta.tables.join(', ')}`,
                            ];
                        }
                    }
                }
            }
        }
    });
}

/* ── Freshness Trend (Line Chart) ───────────────────────────────── */
function renderFreshnessTrendChart() {
    const ctx = document.getElementById('freshnessTrendChart');
    if (!ctx) return;

    const labels = ['Jul 05', 'Jul 06', 'Jul 07', 'Jul 08', 'Jul 09', 'Jul 10', 'Jul 11'];
    const data = [78, 82, 75, 68, 71, 60, 52];

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Avg Score',
                data: data,
                borderColor: '#6366f1',
                backgroundColor: 'rgba(99, 102, 241, 0.08)',
                borderWidth: 4,
                pointBackgroundColor: '#6366f1',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 6,
                pointHoverRadius: 8,
                fill: true,
                tension: 0.4,
                spanGaps: false,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    titleColor: '#0f172a',
                    bodyColor: '#475569',
                    borderColor: 'rgba(128,128,128,0.3)',
                    borderWidth: 1,
                    cornerRadius: 8,
                    padding: 12,
                    displayColors: false,
                    titleFont: { family: "'Source Sans Pro', sans-serif", weight: '700', size: 13 },
                    bodyFont: { family: "'Source Sans Pro', sans-serif", size: 12 },
                    callbacks: {
                        title: function(items) {
                            return `Date: ${items[0].label}`;
                        },
                        label: function(context) {
                            return `Avg Score: ${context.parsed.y.toFixed(1)}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    min: 0,
                    max: 105,
                    title: {
                        display: true,
                        text: 'Avg Score',
                        font: { family: "'Source Sans Pro', sans-serif", size: 12 },
                        color: '#64748b',
                    },
                    grid: { color: '#e5e7eb' },
                    ticks: {
                        font: { family: "'Source Sans Pro', sans-serif", size: 11 },
                        color: '#94a3b8',
                        stepSize: 20,
                    },
                    border: { display: false },
                },
                x: {
                    title: {
                        display: true,
                        text: 'Date',
                        font: { family: "'Source Sans Pro', sans-serif", size: 12 },
                        color: '#64748b',
                    },
                    grid: { color: '#f1f5f9' },
                    ticks: {
                        font: { family: "'Source Sans Pro', sans-serif", size: 11 },
                        color: '#94a3b8',
                    },
                    border: { display: false },
                }
            }
        }
    });
}

/* ── Stale Table Trend (Area Chart) ─────────────────────────────── */
function renderStaleTrendChart() {
    const ctx = document.getElementById('staleTrendChart');
    if (!ctx) return;

    const labels = ['Jul 05', 'Jul 06', 'Jul 07', 'Jul 08', 'Jul 09', 'Jul 10', 'Jul 11'];
    const staleData = [8.2, 12.5, 14.0, 10.2, 16.1, 13.8, 14.5];
    const expectedInterval = 6.0;

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Stale Hours (CUSTOMERS)',
                    data: staleData,
                    borderColor: '#6366f1',
                    backgroundColor: 'rgba(99, 102, 241, 0.2)',
                    borderWidth: 3,
                    pointBackgroundColor: '#6366f1',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 5,
                    fill: true,
                    tension: 0,
                },
                {
                    label: 'Expected Refresh Interval',
                    data: labels.map(() => expectedInterval),
                    borderColor: '#ef4444',
                    borderWidth: 2,
                    borderDash: [6, 4],
                    pointRadius: 0,
                    fill: false,
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        usePointStyle: true,
                        padding: 20,
                        font: { family: "'Source Sans Pro', sans-serif", size: 12 },
                        color: '#0f172a',
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    titleColor: '#0f172a',
                    bodyColor: '#475569',
                    borderColor: 'rgba(128,128,128,0.3)',
                    borderWidth: 1,
                    cornerRadius: 8,
                    padding: 12,
                    displayColors: false,
                    titleFont: { family: "'Source Sans Pro', sans-serif", weight: '700', size: 13 },
                    bodyFont: { family: "'Source Sans Pro', sans-serif", size: 12 },
                    callbacks: {
                        title: function(items) {
                            return `Date: ${items[0].label}`;
                        },
                        label: function(context) {
                            if (context.dataset.label.includes('Expected')) {
                                return `Target: ${context.parsed.y}h`;
                            }
                            return `Stale: ${context.parsed.y.toFixed(1)}h`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'Hours Stale',
                        font: { family: "'Source Sans Pro', sans-serif", size: 12 },
                        color: '#64748b',
                    },
                    grid: { color: '#f1f5f9' },
                    ticks: {
                        font: { family: "'Source Sans Pro', sans-serif", size: 11 },
                        color: '#94a3b8',
                    },
                    border: { display: false },
                },
                x: {
                    grid: { color: '#f1f5f9' },
                    ticks: {
                        font: { family: "'Source Sans Pro', sans-serif", size: 11 },
                        color: '#94a3b8',
                    },
                    border: { display: false },
                }
            }
        }
    });
}

/* ── SLA Trend (Line Chart) ─────────────────────────────────────── */
let slaChartInstance = null;

function renderSlaTrendChart() {
    const ctx = document.getElementById('slaTrendChart');
    if (!ctx) return;

    const labels = [
        'Jul 11 15:00', 'Jul 11 18:00', 'Jul 11 21:00', 'Jul 12 00:00', 
        'Jul 12 03:00', 'Jul 12 06:00', 'Jul 12 09:00', 'Jul 12 12:00'
    ];
    // Creating a dip in the chart to match screenshot
    const freshnessData = [100, 100, 100, 100, 100, 52.1, 100, 100];
    const uptimeData = [100, 99.5, 100, 100, 100, 100, 100, 100];
    const targetData = [95, 95, 95, 95, 95, 95, 95, 95];

    if (slaChartInstance) {
        slaChartInstance.destroy();
    }

    // Determine type
    const slaType = document.getElementById('slaTypeSelect')?.value || 'freshness';
    const isFreshness = slaType === 'freshness';
    const slaData = isFreshness ? freshnessData : uptimeData;
    const labelText = isFreshness ? 'Freshness SLA' : 'Uptime SLA';

    // Update Title if exists
    const titleEl = document.getElementById('slaTrendTitle');
    if (titleEl) {
        titleEl.textContent = `${labelText} Trend`;
    }

    slaChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: `${labelText} %`,
                    data: slaData,
                    borderColor: '#8b5cf6', // purple line
                    backgroundColor: 'rgba(139, 92, 246, 0.15)',
                    borderWidth: 2,
                    pointRadius: 3,
                    pointBackgroundColor: '#8b5cf6',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 6,
                    fill: true,
                    tension: 0.4,
                },
                {
                    label: 'SLA Target (95%)',
                    data: targetData,
                    borderColor: '#ef4444', // red dashed line
                    borderWidth: 2,
                    borderDash: [5, 5],
                    pointRadius: 0,
                    fill: false,
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        usePointStyle: false,
                        boxWidth: 20,
                        boxHeight: 2,
                        padding: 20,
                        font: { family: "'Source Sans Pro', sans-serif", size: 12 },
                        color: '#0f172a',
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    titleColor: '#0f172a',
                    bodyColor: '#475569',
                    borderColor: 'rgba(128,128,128,0.3)',
                    borderWidth: 1,
                    cornerRadius: 8,
                    padding: 12,
                    displayColors: false,
                    titleFont: { family: "'Source Sans Pro', sans-serif", weight: '700', size: 13 },
                    bodyFont: { family: "'Source Sans Pro', sans-serif", size: 12 },
                    callbacks: {
                        title: function(items) {
                            return `Time: 2026-${items[0].label.replace(' ', ' ')}`; // Fake year mapping
                        },
                        label: function(context) {
                            if (context.dataset.label.includes('Target')) return null;
                            const label = context.dataset.label.replace(' %', '');
                            return `${label}: ${context.parsed.y.toFixed(2)}%`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    min: 0,
                    max: 105,
                    title: {
                        display: true,
                        text: 'SLA %',
                        font: { family: "'Source Sans Pro', sans-serif", size: 12 },
                        color: '#64748b',
                    },
                    grid: { color: '#f1f5f9' },
                    ticks: {
                        font: { family: "'Source Sans Pro', sans-serif", size: 11 },
                        color: '#94a3b8',
                        stepSize: 20,
                    },
                    border: { display: false },
                },
                x: {
                    grid: { color: '#f1f5f9' },
                    ticks: {
                        font: { family: "'Source Sans Pro', sans-serif", size: 11 },
                        color: '#94a3b8',
                        maxRotation: 0,
                        autoSkip: true,
                    },
                    border: { display: false },
                }
            }
        }
    });
}

// Add event listener for the SLA dropdown
document.addEventListener('DOMContentLoaded', () => {
    const slaSelect = document.getElementById('slaTypeSelect');
    if (slaSelect) {
        slaSelect.addEventListener('change', () => {
            renderSlaTrendChart();
        });
    }
});

/* ── Pipeline Success Rate (Bar Chart) ──────────────────────────── */
function renderPipelineSuccessChart() {
    const ctx = document.getElementById('pipelineSuccessChart');
    if (!ctx) return;

    const labels = ['Jul 07', 'Jul 08', 'Jul 09', 'Jul 10', 'Jul 11', 'Jul 12'];
    
    // Add dummy data across all days
    const successfulData = [45, 42, 48, 41, 39, 36];
    const failedData = [2, 5, 1, 4, 3, 12];

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'SUCCESSFUL',
                    data: successfulData,
                    backgroundColor: '#059669', // green
                    barPercentage: 1.0,
                    categoryPercentage: 0.8,
                },
                {
                    label: 'FAILED',
                    data: failedData,
                    backgroundColor: '#dc2626', // red
                    barPercentage: 1.0,
                    categoryPercentage: 0.8,
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'right',
                    labels: {
                        usePointStyle: true,
                        boxWidth: 8,
                        boxHeight: 8,
                        padding: 15,
                        font: { family: "'Source Sans Pro', sans-serif", size: 11 },
                        color: '#0f172a',
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    titleColor: '#0f172a',
                    bodyColor: '#475569',
                    borderColor: 'rgba(128,128,128,0.3)',
                    borderWidth: 1,
                    cornerRadius: 8,
                    padding: 12,
                    displayColors: false,
                    titleFont: { family: "'Source Sans Pro', sans-serif", weight: '700', size: 13 },
                    bodyFont: { family: "'Source Sans Pro', sans-serif", size: 12 },
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 35,
                    title: {
                        display: true,
                        text: 'Value',
                        font: { family: "'Source Sans Pro', sans-serif", size: 12 },
                        color: '#64748b',
                    },
                    grid: { color: '#f1f5f9' },
                    ticks: {
                        font: { family: "'Source Sans Pro', sans-serif", size: 11 },
                        color: '#94a3b8',
                        stepSize: 5,
                    },
                    border: { display: false },
                },
                x: {
                    title: {
                        display: true,
                        text: 'Date',
                        font: { family: "'Source Sans Pro', sans-serif", size: 12 },
                        color: '#64748b',
                    },
                    grid: { color: '#f1f5f9', display: false },
                    ticks: {
                        font: { family: "'Source Sans Pro', sans-serif", size: 11 },
                        color: '#94a3b8',
                    },
                    border: { display: false },
                }
            }
        }
    });
}

/* ── Pipeline Error Breakdown (Donut Chart) ─────────────────────── */
function renderPipelineErrorChart() {
    const ctx = document.getElementById('pipelineErrorChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'doughnut',
        plugins: [ChartDataLabels],
        data: {
            labels: ['Compilation Error', 'Timeout Error', 'Auth Error', 'Constraint Error'],
            datasets: [{
                data: [54, 23, 14, 9],
                backgroundColor: ['#dc2626', '#f97316', '#eab308', '#6366f1'],
                borderWidth: 0,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '40%',
            plugins: {
                legend: {
                    display: true,
                    position: 'right',
                    labels: {
                        usePointStyle: true,
                        boxWidth: 8,
                        boxHeight: 8,
                        padding: 20,
                        font: { family: "'Source Sans Pro', sans-serif", size: 11 },
                        color: '#0f172a',
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    titleColor: '#0f172a',
                    bodyColor: '#475569',
                    borderColor: 'rgba(128,128,128,0.3)',
                    borderWidth: 1,
                    cornerRadius: 8,
                    padding: 12,
                    displayColors: false,
                    titleFont: { family: "'Source Sans Pro', sans-serif", weight: '700', size: 13 },
                    bodyFont: { family: "'Source Sans Pro', sans-serif", size: 12 },
                },
                datalabels: {
                    color: '#ffffff',
                    font: { family: "'Source Sans Pro', sans-serif", weight: 'bold', size: 12 },
                    formatter: function(value, context) {
                        return value + '%';
                    },
                    anchor: 'center',
                    align: 'center',
                }
            }
        }
    });
}

/* ── Logs Tab Switching ─────────────────────────────────────────── */
window.switchLogsTab = function(tabName) {
    const btnExec = document.getElementById('tab-btn-execution');
    const btnNotif = document.getElementById('tab-btn-notifications');
    const tabExec = document.getElementById('tab-execution');
    const tabNotif = document.getElementById('tab-notifications');

    if (tabName === 'execution') {
        btnExec.classList.add('active');
        btnExec.style.color = '#3b82f6';
        btnExec.style.borderBottomColor = '#3b82f6';

        btnNotif.classList.remove('active');
        btnNotif.style.color = '#64748b';
        btnNotif.style.borderBottomColor = 'transparent';

        tabExec.style.display = 'block';
        tabNotif.style.display = 'none';
    } else {
        btnNotif.classList.add('active');
        btnNotif.style.color = '#3b82f6';
        btnNotif.style.borderBottomColor = '#3b82f6';

        btnExec.classList.remove('active');
        btnExec.style.color = '#64748b';
        btnExec.style.borderBottomColor = 'transparent';

        tabNotif.style.display = 'block';
        tabExec.style.display = 'none';
    }
};

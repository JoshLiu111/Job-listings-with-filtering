import { jobCard, filterChip } from "./templates.js";
const jobList = document.getElementById("job-list");
const jobError = document.getElementById("job-error");
const jobStatus = document.getElementById("job-status");
const filterBar = document.getElementById("filter-bar");
const filterList = document.getElementById("filter-list");
const clearBtn = document.getElementById("clear-btn");

let jobs = [];
const filters = new Set();

const getTags = (job) => [job.role, job.level, job.languages, job.tools].flat();

const matchesFilters = (job) =>
  [...filters].every((tag) => getTags(job).includes(tag));

function focusFirstJob() {
  jobList.querySelector("[data-tag]")?.focus();
}

function render() {
  const visibleJobs = jobs.filter(matchesFilters);

  jobList.innerHTML = visibleJobs
    .map((job) => jobCard(job, getTags(job)))
    .join("");
  filterList.innerHTML = [...filters].map(filterChip).join("");
  filterBar.hidden = filters.size === 0;
  jobStatus.textContent = `Showing ${visibleJobs.length} of ${jobs.length} jobs`;
}

jobList.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-tag]");
  if (!btn) return;
  const tag = btn.dataset.tag;
  if (filters.has(tag)) return;
  const id = btn.closest("[data-id]").dataset.id;

  filters.add(tag);
  render();
  jobList.querySelector(`[data-id="${id}"] [data-tag="${tag}"]`)?.focus();
});

filterList.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-tag]");
  if (!btn) return;
  const tag = btn.dataset.tag;
  const index = [...filters].indexOf(tag);

  filters.delete(tag);
  render();

  if (filters.size === 0) return focusFirstJob();
  const removeBtns = filterList.querySelectorAll(".chip__remove");
  removeBtns[Math.min(index, removeBtns.length - 1)].focus();
});

clearBtn.addEventListener("click", () => {
  filters.clear();
  render();
  focusFirstJob();
});

try {
  const res = await fetch("./data.json");
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  jobs = await res.json();
  render();
} catch (err) {
  console.error(err);
  jobError.textContent = "Couldn't load jobs. Please refresh the page.";
  jobError.hidden = false;
}

export function jobCard(job, tags) {
  return `<li class="job ${job.featured ? "job--featured" : ""}" data-id="${job.id}">
     <img class="job__logo" src="${job.logo}" alt="" width="88" height="88">
     <div class="job__info">
       <p class="job__top">
         <span class="job__company">${job.company}</span>
         ${job.new ? `<span class="badge badge--new">New!</span>` : ""}              
         ${job.featured ? `<span class="badge badge--featured">Featured</span>` : ""}    
       </p>
       <h2 class="job__position">${job.position}</h2>
       <ul class="job__details">
         <li>${job.postedAt}</li>
         <li>${job.contract}</li>
         <li>${job.location}</li>
       </ul>
     </div>
     <ul class="job__tags">
       ${tags
         .map(
           (tag) =>
             `<li><button class="tag" type="button" data-tag="${tag}">${tag}</button></li>`,
         )
         .join("")}
     </ul>
   </li>`;
}

export function filterChip(tag) {
  return `<li class="chip">
     <span class="chip__label">${tag}</span>
     <button class="chip__remove" type="button" data-tag="${tag}" aria-label="Remove filter ${tag}"></button>
   </li>`;
}

/* Adjona webinars: front page banner and events list. Add new sessions to the list below. */
(function(){
var W=[
{
"slug": "event-2027-01-enquiry-to-opportunity",
"title": "From Enquiry to Opportunity with Dynamics 365 Sales",
"summary": "Follow one enquiry into Dynamics 365 Sales and see how it becomes a lead, then an opportunity, with a clear owner for the next step.",
"dateLong": "Thursday 28 January 2027",
"tz": "GMT",
"start": "2027-01-28T12:30:00+00:00",
"end": "2027-01-28T13:00:00+00:00"
},
{
"slug": "event-2027-02-sharepoint-find-documents",
"title": "Why Can’t We Find the Right Document in SharePoint?",
"summary": "Walk through a cluttered SharePoint library and see how navigation, naming and ownership make current documents easier to find.",
"dateLong": "Thursday 25 February 2027",
"tz": "GMT",
"start": "2027-02-25T12:30:00+00:00",
"end": "2027-02-25T13:00:00+00:00"
},
{
"slug": "event-2027-03-who-still-has-access",
"title": "Who Still Has Access? Five Microsoft 365 Checks for Charities",
"summary": "Five places to check who can still reach your Microsoft 365 data: former staff, guests, shared links, admin roles and ownerless sites.",
"dateLong": "Thursday 25 March 2027",
"tz": "GMT",
"start": "2027-03-25T12:30:00+00:00",
"end": "2027-03-25T13:00:00+00:00"
},
{
"slug": "event-2027-04-shared-inbox-ownership",
"title": "From Shared Inbox to Clear Ownership",
"summary": "For teams handling referrals, service requests or enquiries in a shared mailbox: assign incoming work and show who is following it up.",
"dateLong": "Thursday 29 April 2027",
"tz": "BST",
"start": "2027-04-29T12:30:00+01:00",
"end": "2027-04-29T13:00:00+01:00"
},
{
"slug": "event-2027-05-approval-workflow-power-automate",
"title": "Build Your First Approval Workflow with Power Automate",
"summary": "Follow a purchase request from submission through approval to recording the decision, using Power Automate.",
"dateLong": "Thursday 27 May 2027",
"tz": "BST",
"start": "2027-05-27T12:30:00+01:00",
"end": "2027-05-27T13:00:00+01:00"
},
{
"slug": "event-2027-06-inspection-evidence",
"title": "Can You Find the Evidence When an Inspector Asks?",
"summary": "For care providers: see how naming, ownership and review dates help staff find the current evidence when an inspector asks.",
"dateLong": "Thursday 24 June 2027",
"tz": "BST",
"start": "2027-06-24T12:30:00+01:00",
"end": "2027-06-24T13:00:00+01:00"
},
{
"slug": "event-2027-07-excel-or-dynamics-365-sales",
"title": "When Should You Replace Excel with Dynamics 365 Sales?",
"summary": "Compare a well-kept enquiry spreadsheet with a CRM and leave with criteria for improving the spreadsheet or piloting Dynamics 365.",
"dateLong": "Thursday 29 July 2027",
"tz": "BST",
"start": "2027-07-29T12:30:00+01:00",
"end": "2027-07-29T13:00:00+01:00"
},
{
"slug": "event-2027-08-outlook-teams-outage",
"title": "If Outlook and Teams Stopped Working Tomorrow",
"summary": "Work through the first hour of a Microsoft 365 outage and leave with a short exercise to test your team’s arrangements.",
"dateLong": "Thursday 26 August 2027",
"tz": "BST",
"start": "2027-08-26T12:30:00+01:00",
"end": "2027-08-26T13:00:00+01:00"
},
{
"slug": "event-2027-09-list-app-or-crm",
"title": "Should This Process Be a List, an App or a CRM?",
"summary": "Compare Microsoft Lists, Power Apps and Dynamics 365 for one internal service request, and decide how much structure you need.",
"dateLong": "Thursday 30 September 2027",
"tz": "BST",
"start": "2027-09-30T12:30:00+01:00",
"end": "2027-09-30T13:00:00+01:00"
},
{
"slug": "event-2027-10-trustees-staff-ai",
"title": "What Should Trustees Ask About Staff Use of AI?",
"summary": "Realistic scenarios and practical questions for trustees and managers on how staff use AI tools and who checks the output.",
"dateLong": "Thursday 28 October 2027",
"tz": "BST",
"start": "2027-10-28T12:30:00+01:00",
"end": "2027-10-28T13:00:00+01:00"
},
{
"slug": "event-2027-11-proposal-to-invoice",
"title": "From Accepted Proposal to Invoice with Dynamics 365 Sales and Business Central",
"summary": "Follow a small service engagement from accepted proposal to invoice, without retyping customer and order details.",
"dateLong": "Thursday 25 November 2027",
"tz": "GMT",
"start": "2027-11-25T12:30:00+00:00",
"end": "2027-11-25T13:00:00+00:00"
}
];
var now=new Date();
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
var up=W.filter(function(w){return new Date(w.end)>now;});
var past=W.filter(function(w){return new Date(w.end)<=now;}).reverse();
/* Front page banner: next webinar */
var nb=document.getElementById('next-webinar');
if(nb&&up.length){var n=up[0];
 nb.innerHTML='<a class="event-banner" href="'+n.slug+'.html"><div class="event-banner-inner"><div><div class="event-meta">Next free webinar &middot; '+esc(n.dateLong)+' &middot; 12:30 PM '+n.tz+'</div><div class="event-title">'+esc(n.title)+'</div></div><span class="event-cta">Find out more &rarr;</span></div></a>';}
/* Events page: upcoming list */
var ul=document.getElementById('upcoming-webinars');
if(ul){
 if(up.length){
  ul.innerHTML='<div style="display:flex;flex-direction:column;gap:1.5rem;">'+up.map(function(w,i){
   return '<a href="'+w.slug+'.html" style="display:block;border:2px solid var(--ink);text-decoration:none;color:var(--ink);background:#fff;">'+
    (i===0?'<img src="images/'+w.slug+'.png" alt="" style="display:block;width:100%;height:auto;border-bottom:2px solid var(--ink);">':'')+
    '<div style="padding:1.5rem 2rem;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;"><div>'+
    '<div style="font-family:\'JetBrains Mono\',monospace;font-size:.58rem;letter-spacing:.14em;text-transform:uppercase;color:var(--ms-blue);margin-bottom:.35rem;">'+(i===0?'Next webinar &middot; ':'')+esc(w.dateLong)+'</div>'+
    '<div style="font-family:\'Epilogue\',sans-serif;font-size:1.1rem;font-weight:900;">'+esc(w.title)+'</div>'+
    '<div style="font-size:.85rem;color:var(--muted);margin-top:.35rem;line-height:1.6;max-width:60ch;">'+esc(w.summary)+'</div>'+
    '<div style="font-size:.82rem;color:var(--muted);margin-top:.35rem;">Free online webinar &middot; 12:30&ndash;1:00 PM '+w.tz+' &middot; Microsoft Teams</div></div>'+
    '<span style="font-family:\'Epilogue\',sans-serif;font-size:.88rem;font-weight:900;background:var(--ms-yel);padding:.6rem 1.25rem;border:2px solid var(--ink);white-space:nowrap;">Details and registration &rarr;</span></div></a>';}).join('')+'</div>';
  var nx=ul.nextElementSibling; if(nx&&!nx.id) nx.style.display='none';
 } else { ul.innerHTML=''; }
}
/* Events page: finished 2027 webinars join the previous sessions list */
if(past.length){
 var hs=document.querySelectorAll('h2'),pl=null;
 for(var i=0;i<hs.length;i++){if(/^Previous/.test(hs[i].textContent.trim())){pl=hs[i].nextElementSibling;break;}}
 if(pl){pl.insertAdjacentHTML('afterbegin',past.map(function(w){
  return '<div style="border:1px solid var(--border);padding:1.5rem 2rem;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;"><div>'+
   '<div style="font-family:\'JetBrains Mono\',monospace;font-size:.58rem;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);margin-bottom:.35rem;">'+esc(w.dateLong.replace(/^\w+ /,''))+'</div>'+
   '<div style="font-family:\'Epilogue\',sans-serif;font-size:1rem;font-weight:800;color:var(--ink);">'+esc(w.title)+'</div>'+
   '<div style="font-size:.82rem;color:var(--muted);margin-top:.25rem;">Free online webinar &middot; 12:30&ndash;1:00 PM '+w.tz+' &middot; Microsoft Teams</div></div></div>';}).join(''));}
}
})();

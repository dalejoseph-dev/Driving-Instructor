// Simple client-side sort for the instructors table (by rating or price).
(function(){
  const table = document.querySelector('[data-sort-table="1"]');
  if(!table) return;
  const tbody = table.querySelector('tbody');
  const rows = Array.from(tbody.querySelectorAll('tr'));

  function parsePrice(s){
    const m = (s||'').replace(/[^0-9.]/g,'');
    return m ? parseFloat(m) : Number.POSITIVE_INFINITY;
  }
  function sortRows(mode){
    const sorted = rows.slice().sort((a,b)=>{
      if(mode==='rating'){
        return (parseFloat(b.dataset.rating||'0') - parseFloat(a.dataset.rating||'0'));
      }
      if(mode==='price'){
        return (parsePrice(a.dataset.price) - parsePrice(b.dataset.price));
      }
      return 0;
    });
    sorted.forEach(r=>tbody.appendChild(r));
  }

  const ratingBtn = document.querySelector('[data-sort="rating"]');
  const priceBtn = document.querySelector('[data-sort="price"]');

  ratingBtn && ratingBtn.addEventListener('click', ()=>sortRows('rating'));
  priceBtn && priceBtn.addEventListener('click', ()=>sortRows('price'));
})();

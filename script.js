function Sidebar() {
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'flex'
}
function Hidebar() {
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'none'
}
function Filterbar() {
    const filterlist = document.querySelector('.filter-list')
    filterlist.style.display = 'block'
}
function Hidefilter() {
    const filterlist = document.querySelector('.filter-list')
    filterlist.style.display = 'none'
}
function switchTab(tab, el) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    el.classList.add('active');
    const role = document.getElementById('signup-role');
    if (role) role.style.display = tab === 'signup' ? 'block' : 'none';
}
function selectRole(el) {
    document.querySelectorAll('.child-box').forEach(r => r.classList.remove('active'));
    el.classList.add('active');
}
function welcome() {
    // showToast('Welcome to Dabaara!')
    setTimeout(() => window.location.href = "index.html", 800);
}
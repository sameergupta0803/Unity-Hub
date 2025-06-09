// Clean, consistent navbar profile picture logic
function updateNavbarState() {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const authBtns = document.getElementById('auth-buttons');
  const userProfile = document.getElementById('user-profile');
  const profilePic = document.querySelector('.profile-pic');
  const logoutBtn = document.getElementById('logout-btn');

  if (isLoggedIn) {
    if (authBtns) authBtns.style.display = 'none';
    if (userProfile) userProfile.style.display = 'flex';
    if (profilePic) {
      const userName = localStorage.getItem('userName') || '';
      const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=276ef1&color=fff&size=128`;
      profilePic.style.backgroundImage = `url('${avatarUrl}')`;
      profilePic.style.backgroundSize = 'cover';
      profilePic.style.backgroundPosition = 'center';
      profilePic.textContent = '';
    }
    if (logoutBtn) logoutBtn.style.display = 'inline-block';
  } else {
    if (authBtns) authBtns.style.display = 'flex';
    if (userProfile) userProfile.style.display = 'none';
    if (profilePic) {
      profilePic.style.backgroundImage = '';
      profilePic.textContent = '';
    }
    if (logoutBtn) logoutBtn.style.display = 'none';
  }
}

// Call updateNavbarState when page loads
document.addEventListener('DOMContentLoaded', () => {
  updateNavbarState();
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.onclick = function() {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userName');
      localStorage.removeItem('userEmail');
      updateNavbarState();
      window.location.href = 'Home.html';
    };
  }
}); 
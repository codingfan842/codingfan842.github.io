// Preloader


const settingsPanel = document.getElementById('settings-panel');
const settingsOverlay = document.getElementById('settings-overlay');
const narratorOverlay = document.getElementById('narrator-right')
const settingsNavigation = document.getElementById('settings-navigation');
const openSettingsBtn = document.getElementById('open-settings');
const closeSettingsBtn = document.getElementById('close-settings');

function openSettings() {
    settingsPanel.classList.add('active');
    settingsOverlay.classList.add('active');
    narratorOverlay.classList.add('active')
    settingsOverlay.removeAttribute('inert');
    document.body.style.overflow = 'hidden'; 


}

function closeSettings() {
    settingsPanel.classList.remove('active');
    settingsOverlay.classList.remove('active');
    narratorOverlay.classList.remove('active')
    settingsOverlay.setAttribute('inert', '');
    document.body.style.overflow = ''; 

}

document.addEventListener('keydown', (e) => {
    if (['TEXTAREA', 'INPUT'].includes(e.target.tagName) || e.target.contentEditable === 'true') {
        return;
    }
    if (e.key === '?') { openSettings() }
});
if (openSettingsBtn) {
    openSettingsBtn.addEventListener('click', openSettings);
}
closeSettingsBtn.addEventListener('click', closeSettings);
settingsOverlay.addEventListener('click', closeSettings);
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeSettings();
    }
});



const hoverSound = new Audio("/assets/audio/hover.mp3");
const clickSound = new Audio("/assets/audio/click.mp3");
const hoverVolumeSlider = document.getElementById('hoverVolume');
const clickVolumeSlider = document.getElementById('clickVolume');
hoverVolumeSlider.addEventListener('input', (e) => {
  hoverSound.volume = e.target.value / 100;
});
clickVolumeSlider.addEventListener('input', (e) => {
  clickSound.volume = e.target.value / 100;
});
const playSound = (audio) => {
  audio.currentTime = 0;
  audio.play();
};
document.querySelectorAll('.clickable').forEach(el => {
  el.addEventListener('mouseenter', () => playSound(hoverSound));
  el.addEventListener('click', () => playSound(clickSound));
});

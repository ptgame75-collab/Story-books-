// १. सेटअप
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x111111); // अँध्यारो युद्ध मैदान

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// २. प्लेयर (तपाईंको ट्याङ्क वा सैनिक)
const playerGeo = new THREE.BoxGeometry(1, 1, 1);
const playerMat = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const player = new THREE.Mesh(playerGeo, playerMat);
scene.add(player);
camera.position.z = 5;

// ३. शत्रुहरू (तपाईंको डेटाबाट आउने)
function createEnemy(x, y, z) {
    const enemyGeo = new THREE.BoxGeometry(0.8, 0.8, 0.8);
    const enemyMat = new THREE.MeshBasicMaterial({ color: 0xff2400 }); // सिन्दूर रातो शत्रु
    const enemy = new THREE.Mesh(enemyGeo, enemyMat);
    enemy.position.set(x/100, y/100, z/100); // डेटा अलि ठूलो भएकोले सानो पारेको
    scene.add(enemy);
}

// तपाईंको डेटा प्रयोग गरेर शत्रु राख्ने (नमुना)
createEnemy(711, 47, -2187); 

// ४. कमाण्डहरू (Controls)
window.addEventListener('keydown', (e) => {
    if(e.key === "ArrowLeft") player.position.x -= 0.1;
    if(e.key === "ArrowRight") player.position.x += 0.1;
    if(e.key === " ") shoot(); // स्पेस थिच्दा फायर
});

function shoot() {
    console.log("फायर भयो!");
    // यहाँ गोली निस्कने कोड थप्न सकिन्छ
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();


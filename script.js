// १. सिन र क्यामरा सेटअप
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x111111); // अँध्यारो युद्ध मैदान

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// २. प्लेयर (तपाईं - हरियो ब्लक)
const playerGeo = new THREE.BoxGeometry(1, 1, 1);
const playerMat = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const player = new THREE.Mesh(playerGeo, playerMat);
scene.add(player);
camera.position.z = 5;

// ३. गेमका लागि आवश्यक एरे (Arrays) र भेरिएबल
let bullets = [];
let enemies = [];
let score = 0;

// ४. शत्रुहरू बनाउने (तपाईंको डेटाको आधारमा केही स्थानहरू)
function spawnEnemies() {
    const enemyPositions = [
        {x: 0, y: 0, z: -10}, 
        {x: 2, y: 0, z: -15}, 
        {x: -2, y: 0, z: -12},
        {x: 5, y: 0, z: -20},
        {x: -5, y: 0, z: -25}
    ];

    enemyPositions.forEach(pos => {
        const enemyGeo = new THREE.BoxGeometry(0.8, 0.8, 0.8);
        const enemyMat = new THREE.MeshBasicMaterial({ color: 0xFF2400 }); // सिन्दूर रातो शत्रु
        const enemy = new THREE.Mesh(enemyGeo, enemyMat);
        enemy.position.set(pos.x, pos.y, pos.z);
        scene.add(enemy);
        enemies.push(enemy);
    });
}
spawnEnemies();

// ५. गोली हान्ने प्रणाली
function shoot() {
    const bulletGeo = new THREE.SphereGeometry(0.1, 8, 8);
    const bulletMat = new THREE.MeshBasicMaterial({ color: 0xffff00 }); // पहेँलो गोली
    const bullet = new THREE.Mesh(bulletGeo, bulletMat);
    
    bullet.position.set(player.position.x, player.position.y, player.position.z);
    scene.add(bullet);
    bullets.push(bullet);
}

// ६. कमाण्डहरू (Controls)
window.addEventListener('keydown', (e) => {
    if(e.key === "ArrowLeft") player.position.x -= 0.5;
    if(e.key === "ArrowRight") player.position.x += 0.5;
    if(e.key === " ") shoot(); // Space थिच्दा गोली निस्कने
});

// ७. गेम अपडेट (गोली चल्ने र शत्रु मर्ने लजिक)
function updateGame() {
    // गोलीहरूको मुभमेन्ट र टक्कर चेक
    bullets.forEach((bullet, bIndex) => {
        bullet.position.z -= 0.5;

        enemies.forEach((enemy, eIndex) => {
            if (bullet.position.distanceTo(enemy.position) < 0.7) {
                scene.remove(enemy);
                enemies.splice(eIndex, 1);
                scene.remove(bullet);
                bullets.splice(bIndex, 1);
                
                score += 10;
                document.getElementById('score').innerText = "शत्रु पराजित: " + score;
            }
        });
    });

    // शत्रुहरू प्लेयरतिर सर्ने
    enemies.forEach(enemy => {
        enemy.position.z += 0.03; 
        if (enemy.position.z > 4) {
            alert("गेम ओभर! स्कोर: " + score);
            location.reload(); 
        }
    });
}

// ८. एनिमेसन लुप
function animate() {
    requestAnimationFrame(animate);
    updateGame();
    renderer.render(scene, camera);
}
animate();

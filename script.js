const workouts = [
    { id: 1, name: "Barbell Bench Press", type: "chest", form: "Arch slightly, plant feet firmly. Bar touches mid-chest, press up explosively.", ratio: 0.6 },
    { id: 2, name: "Incline Dumbbell Press", type: "chest", form: "Set bench to 30 degrees. Control the negative, squeeze the upper chest at the top.", ratio: 0.4 },
    { id: 3, name: "Standard Pushups", type: "chest", form: "Body in a straight line. Lower until chest grazes the floor. Push up fully.", ratio: 0 },
    { id: 4, name: "Barbell Deadlift", type: "back", form: "Flat back, brace core. Drive through heels. The bar should drag up your shins.", ratio: 0.8 },
    { id: 5, name: "Pull-Ups", type: "back", form: "Pronated grip. Pull elbows down to your pockets until chin clears the bar.", ratio: 0 },
    { id: 6, name: "Barbell Squats", type: "legs", form: "Break at hips and knees simultaneously. Depth should be parallel or lower.", ratio: 0.7 },
    { id: 7, name: "Bulgarian Split Squats", type: "legs", form: "Rear foot elevated. Drop straight down. Keep torso relatively upright.", ratio: 0.3 },
    { id: 8, name: "Forearm Plank", type: "core", form: "Elbows directly under shoulders. Squeeze glutes and brace abs tightly.", ratio: 0 },
    { id: 9, name: "Hanging Leg Raises", type: "core", form: "Hang from bar. Keep legs straight and lift until parallel to floor. No swinging.", ratio: 0 },
    { id: 10, name: "Overhead Press", type: "chest", form: "Strict press. Bar path straight up. Head moves out of the way, then back under.", ratio: 0.4 }
];

let currentUserWeight = 0;
let currentMultiplier = 1;

function generatePlan() {
    currentUserWeight = parseFloat(document.getElementById('userWeight').value);
    const bodyType = document.getElementById('bodyType').value;
    
    if (!currentUserWeight || !bodyType) {
        alert("Enter your weight and body type to initialize protocol.");
        return;
    }

    const phrases = [
        "YEAAAHHH BABBBY!", 
        "LIGHT WEIGHT BABY!", 
        "AIN'T NOTHING TO IT BUT TO DO IT!", 
        "EVERYBODY WANTS TO BE A BODYBUILDER...", 
        "LET'S GET THIS BREAD!",
        "NO EXCUSES. JUST RESULTS.",
        "TIME TO BLEED!"
    ];
    document.getElementById('hype-quote').innerText = phrases[Math.floor(Math.random() * phrases.length)];

    let tip = "";
    switch(bodyType) {
        case 'skinny': tip = "Caloric surplus is mandatory. Lift heavy, eat heavily. Build the foundation."; currentMultiplier = 0.8; break;
        case 'skinny-fat': tip = "Recomp protocol active. High protein, heavy lifting, moderate cardio."; currentMultiplier = 0.9; break;
        case 'fat': tip = "Cut the noise. High intensity, strict deficit. Reveal the muscle underneath."; currentMultiplier = 1.0; break;
        case 'muscular': tip = "Maintain dominance. Focus on progressive overload and strict form."; currentMultiplier = 1.2; break;
        case 'aesthetic': tip = "Symmetry is everything. Isolate weak points. Keep it clean."; currentMultiplier = 1.1; break;
    }

    document.getElementById('strategy-tip').innerText = tip;
    document.getElementById('intel-box').classList.remove('hidden');

    // Trigger visual scroll down
    document.getElementById('intel-box').scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    // Re-render current filter with new weights
    const activeBtn = document.querySelector('.filter-btn.active');
    const activeCategory = activeBtn.innerText.toLowerCase();
    filterWorkouts(activeCategory, activeBtn);
}

function filterWorkouts(category, btnElement = null) {
    // Handle button active states safely
    if (btnElement) {
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        btnElement.classList.add('active');
    }

    const grid = document.getElementById('workout-grid');
    grid.innerHTML = "";

    const filtered = category === 'all' ? workouts : workouts.filter(w => w.type === category);

    filtered.forEach((ex, index) => {
        let weightHTML = "";
        
        if (ex.ratio === 0) {
            weightHTML = `BODYWEIGHT // TIME UNDER TENSION`;
        } else if (currentUserWeight > 0) {
            let startKg = Math.round((currentUserWeight * ex.ratio) * currentMultiplier);
            let startLbs = Math.round(startKg * 2.20462);
            weightHTML = `START: ${startKg}KG // ${startLbs}LBS`;
        } else {
            weightHTML = `AWAITING USER DATA...`;
        }

        // We use index to stagger the CSS animation delay
        grid.innerHTML += `
            <div class="card" style="animation-delay: ${index * 0.1}s">
                <div class="card-tag">// ${ex.type}</div>
                <h3>${ex.name}</h3>
                <p><strong>FORM:</strong> ${ex.form}</p>
                <div class="card-weight">${weightHTML}</div>
            </div>
        `;
    });
}

// Initial render
window.onload = () => filterWorkouts('all', document.querySelector('.filter-btn.active'));
let player_state = 'idle';
const dropdown = document.getElementById('animation');
dropdown.addEventListener('change', function (e) {
    player_state = e.target.value;
})

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = canvas.width = 400;
const CANVAS_HEIGHT = canvas.height = 400;

const player_image = new Image();
player_image.src = 'samuraipng.png';


const sprite_width = 96;
const sprite_height = 98;

let frame_x = 0;
let frame_y = 1;
let game_frame = 0;
let stagger_frames = 8;


const sprite_animations = [];
const animation_states = [{
        name: 'idle',
        frames: 7
    },
    {
        name: 'walk',
        frames: 7
    },
    {
        name: 'run',
        frames: 8
    },
    {
        name: 'attack_1',
        frames: 5
    },
    {
        name: 'attack_2',
        frames: 5
    },
    {
        name: 'kunai',
        frames: 5
    },
    {
        name: 'jump',
        frames: 9
    },
    {
        name: 'blade',
        frames: 6
    },
    {
        name: 'hurt',
        frames: 4
    },
    {
        name: 'dead',
        frames: 5
    }
];

animation_states.forEach((state, index) => {
    let frames = {
        loc: []
    }
    for (let j = 0; j < state.frames; j++) {
        let positionX = j * sprite_width;
        let positionY = index * sprite_height;
        frames.loc.push({
            x: positionX,
            y: positionY
        })
    }
    sprite_animations[state.name] = frames;
});

document.addEventListener('keydown', function (e) {
    if (e.keyCode == '32') {
        player_state = 'jump';
        setTimeout(function () {
            player_state = 'idle';
        }, 1200)
    }
})


function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    let position = Math.floor(game_frame / stagger_frames) % sprite_animations[player_state].loc.length;
    let frame_x = sprite_width * position;
    let frame_y = sprite_animations[player_state].loc[position].y;
    ctx.drawImage(player_image, frame_x, frame_y, sprite_height, sprite_width, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    game_frame++;

    requestAnimationFrame(animate);
}

animate();
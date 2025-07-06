// Set the target date to March 16th, 2026
const targetDate = new Date('March 16, 2026 00:00:00').getTime();

// Get DOM elements
const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');

// Update countdown every second
const countdown = setInterval(() => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    // Calculate time units
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Update DOM with leading zeros
    daysElement.textContent = days.toString().padStart(2, '0');
    hoursElement.textContent = hours.toString().padStart(2, '0');
    minutesElement.textContent = minutes.toString().padStart(2, '0');
    secondsElement.textContent = seconds.toString().padStart(2, '0');



    // Check if countdown is finished
    if (distance < 0) {
        clearInterval(countdown);
        daysElement.textContent = '00';
        hoursElement.textContent = '00';
        minutesElement.textContent = '00';
        secondsElement.textContent = '00';
        
        // Update the page content for the marathon day
        document.querySelector('.title').textContent = "IT'S MARATHON DAY! 🏃‍♂️";
        document.querySelector('.subtitle').textContent = "Go crush it! You've got this! 💪";
        document.querySelector('.motivation-text').textContent = "Let's do this! 🚀";
        document.querySelector('.friends-mention').textContent = "Time to show what you're made of! 🏆";
    }
}, 1000);

// Add some interactive effects
document.addEventListener('DOMContentLoaded', () => {
    // Add click effects to countdown items
    const countdownItems = document.querySelectorAll('.countdown-item');
    countdownItems.forEach(item => {
        item.addEventListener('click', () => {
            item.style.transform = 'scale(0.95)';
            setTimeout(() => {
                item.style.transform = 'scale(1)';
            }, 150);
        });
    });

    // Add some random sparkle effects
    setInterval(() => {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = '✨';
        sparkle.style.position = 'absolute';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.fontSize = '1rem';
        sparkle.style.opacity = '0.8';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '5';
        sparkle.style.animation = 'sparkle 2s ease-out forwards';
        
        document.querySelector('.container').appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, 2000);
    }, 3000);
});

// Add sparkle animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes sparkle {
        0% {
            opacity: 0.8;
            transform: scale(0) rotate(0deg);
        }
        50% {
            opacity: 1;
            transform: scale(1.2) rotate(180deg);
        }
        100% {
            opacity: 0;
            transform: scale(0) rotate(360deg);
        }
    }
`;
document.head.appendChild(style);

// Add some motivational messages that cycle through
const motivationalMessages = [
    "You've got this! 🚀",
    "Stay strong! 💪",
    "Keep pushing! 🔥",
    "You're unstoppable! ⚡",
    "Dream big! 🏆",
    "You're a champion! 🏃‍♂️"
];

let messageIndex = 1; // Start with index 1 since the first message is already in HTML
setInterval(() => {
    const motivationText = document.querySelector('.motivation-text');
    if (motivationText) {
        // Smooth fade transition
        motivationText.style.transition = 'opacity 0.3s ease';
        motivationText.style.opacity = '0.3';
        setTimeout(() => {
            motivationText.textContent = motivationalMessages[messageIndex];
            motivationText.style.opacity = '1';
            

            
            messageIndex = (messageIndex + 1) % motivationalMessages.length;
        }, 300);
    }
}, 3000); 
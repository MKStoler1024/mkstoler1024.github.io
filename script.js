// Typing effect
const texts = [
    "Learn not and know not.",
    "Don't give up and don't give in.",
    "Hang on to your dreams."
];
let currentTextIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
const typingElement = document.getElementById('typingText');

function typeText() {
    const currentText = texts[currentTextIndex];
    
    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, currentCharIndex - 1);
        currentCharIndex--;
    } else {
        typingElement.textContent = currentText.substring(0, currentCharIndex + 1);
        currentCharIndex++;
    }
    
    if (!isDeleting && currentCharIndex === currentText.length) {
        setTimeout(() => isDeleting = true, 2000);
    } else if (isDeleting && currentCharIndex === 0) {
        isDeleting = false;
        currentTextIndex = (currentTextIndex + 1) % texts.length;
    }
    
    setTimeout(typeText, isDeleting ? 50 : 100);
}

// View counter animation
function animateCounter(target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    const element = document.getElementById('viewCount');
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            clearInterval(timer);
            current = target;
        }
        element.textContent = Math.floor(current);
    }, 16);
}

// 仓库信息填充
document.addEventListener("DOMContentLoaded", async function () {
    async function fetchRepoInfo() {
        let urls = [
            "https://api.github.com/repos/MKStoler1024/mkstoler1024.github.io"
        ];
        // fastestMirror 可选，未定义时跳过
        if (typeof fastestMirror !== "undefined" && fastestMirror) {
            urls.push(fastestMirror + "/https://api.github.com/repos/MKStoler1024/mkstoler1024.github.io");
        }
        for (const mirror of [
            "https://gh.llkk.cc",
            "https://ghfile.geekertao.top",
            "https://gh.dpik.top",
            "https://github.dpik.top",
            "https://github.acmsz.top",
            "https://git.yylx.win"
        ]) {
            urls.push(mirror + "/https://api.github.com/repos/InkCanvasForClass/community");
        }
        for (let i = 0; i < urls.length; i++) {
            try {
                let res = await fetch(urls[i], { cache: "no-store" });
                if (res.ok) {
                    return await res.json();
                }
            } catch (e) {
                // ignore
            }
        }
        return null;
    }
    // 获取并填充
    const repo = await fetchRepoInfo();
    if (repo) {
        document.getElementById("repoStars").textContent = repo.stargazers_count ?? "-";
        document.getElementById("repoForks").textContent = repo.forks_count ?? "-";
        document.getElementById("repoWatchers").textContent = repo.subscribers_count ?? "-";
    } else {
        document.getElementById("repoStars").textContent = "获取失败";
        document.getElementById("repoForks").textContent = "获取失败";
        document.getElementById("repoWatchers").textContent = "获取失败";
    }
});

// Start animations when page loads
window.addEventListener('DOMContentLoaded', () => {
    typeText();
    animateCounter(1587); // Replace with actual view count
});
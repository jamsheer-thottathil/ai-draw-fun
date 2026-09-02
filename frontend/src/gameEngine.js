// Drawing objects for the game
export const DRAWING_OBJECTS = [
  'elephant',
  'car',
  'house',
  'tree',
  'rocket',
  'fish',
  'dog',
  'cat',
  'lion',
  'airplane',
  'flower',
  'sun',
  'boat',
  'apple',
  'ice cream',
  'bicycle',
  'pizza',
  'star',
  'cloud',
  'mountain',
  'ocean',
  'bridge',
  'lighthouse',
  'castle',
  'dinosaur',
  'ghost',
  'robot',
  'alien',
  'spider',
  'butterfly',
  'penguin',
  'whale',
  'shark',
  'eagle',
  'turtle',
  'snake',
  'pig',
  'cow',
  'sheep',
  'duck',
  'swan',
  'owl',
  'penguin',
  'cactus',
  'mushroom',
  'tree',
  'palm',
  'fire',
  'lightning',
  'rainbow',
  'snowflake',
];

// Get a random object not yet used in the game
export function getRandomObject(usedObjects) {
  const available = DRAWING_OBJECTS.filter((obj) => !usedObjects.includes(obj));
  if (available.length === 0) {
    return DRAWING_OBJECTS[Math.floor(Math.random() * DRAWING_OBJECTS.length)];
  }
  return available[Math.floor(Math.random() * available.length)];
}

// Calculate score
export function calculateScore(remainingSeconds, confidence, isWin) {
  if (!isWin) return 0;
  const base = 100;
  const timeBonus = remainingSeconds * 20;
  const confidenceBonus = Math.round(confidence * 50);
  return base + timeBonus + confidenceBonus;
}

// Massive IT-themed tech stacks and actions
const devTechStacks = [
  'React', 'Node.js', 'Docker', 'Kubernetes', 'Python', 'Rust', 'GraphQL', 'TypeScript', 
  'Vue.js', 'Angular', 'Svelte', 'FastAPI', 'Django', 'Spring Boot', 'Go', 'Java',
  'C++', 'C#', '.NET', 'Rails', 'Express', 'Next.js', 'Remix', 'Astro', 'PostgreSQL',
  'MongoDB', 'Redis', 'Elasticsearch', 'AWS', 'Azure', 'GCP', 'Terraform', 'Ansible',
  'Jenkins', 'GitHub Actions', 'GitLab CI', 'WebAssembly', 'Electron', 'Tauri',
  'Solana', 'Ethereum', 'WebGL', 'Three.js', 'Babylon.js', 'OpenGL', 'CUDA', 'TensorFlow',
];

const devActions = [
  'compiled', 'refactored', 'containerized', 'debugged', 'architected', 'parsed', 'linted', 
  'transpiled', 'deployed', 'optimized', 'profiled', 'benchmarked', 'orchestrated', 
  'load-balanced', 'serialized', 'deserialized', 'memoized', 'cached', 'encrypted', 
  'decrypted', 'versioned', 'sharded', 'replicated', 'indexed', 'tokenized', 'minified',
  'obfuscated', 'polyfilled', 'tree-shook', 'lazy-loaded', 'auto-scaled', 'rollbacked',
  'hotfixed', 'patched', 'migrated', 'normalized', 'denormalized', 'validated', 'sanitized',
];

function getRandomTech() {
  return devTechStacks[Math.floor(Math.random() * devTechStacks.length)];
}

function getRandomAction() {
  return devActions[Math.floor(Math.random() * devActions.length)];
}

const funnyWins = [
  (target, guess, conf) => `🎉 SUCCESSFUL BUILD! Asked for ${target}, compiled as ${guess}! All unit tests passed! 🚀`,
  (target, guess, conf) => `💻 GIT PUSH SUCCESS! AI merged your ${guess} into ${target} cleanly using ${getRandomTech()}! ⚡`,
  (target, guess, conf) => `✨ DEPLOYED TO PROD! Your ${target} masterpiece is live without errors! 🏆`,
  (target, guess, conf) => `⚡ LIGHTNING FAST ALGORITHM! ${target.toUpperCase()} successfully ${getRandomAction()} with zero memory leaks! 💡`,
  (target, guess, conf) => `🏆 SENIOR DEV ENERGY! Clean architecture detected for your ${target} via ${getRandomTech()}! 🔥`,
  (target, guess, conf) => `🚀 ZERO-DAY SUCCESS! Your ${target} passed all security audits and code reviews! 🛡️`,
  (target, guess, conf) => `🌟 STACK OVERFLOW CERTIFIED! Your ${target} rendering matched expectations perfectly! 💻`,
  (target, guess, conf) => `💎 CLEAN CODE MEDAL! Not a single bug found in your ${target} sketch! 🏅`,
  (target, guess, conf) => `🎯 10X ENGINEER DETECTED! Your ${target} code is so optimal it won a Turing Award! 🤖`,
  (target, guess, conf) => `⚙️ PERFECTLY BALANCED! Your ${target} has O(1) time complexity! Flawless! ✨`,
  (target, guess, conf) => `🔐 CRYPTOGRAPHICALLY SECURE! Your ${target} is NSA-approved! 🛡️`,
  (target, guess, conf) => `📊 BIG O NOTATION CHAMPION! Your ${target} scales infinitely! 📈`,
  (target, guess, conf) => `🎪 MAINFRAME APPROVED! Your ${target} would make a COBOL programmer weep with joy! 💜`,
  (target, guess, conf) => `🌐 WEB3 CERTIFIED! Your ${target} is decentralized and immutable! ⛓️`,
  (target, guess, conf) => `🤖 AI RECOGNIZES GENIUS! Neural network confidence: ${Math.round(conf * 100)}% on that ${target}! 🧠`,
  (target, guess, conf) => `🎮 UNREAL ENGINE APPROVED! Your ${target} rendering has ray-tracing enabled! 🎬`,
  (target, guess, conf) => `💰 PRODUCTION-READY CODE! Your ${target} is enterprise-grade! 💼`,
  (target, guess, conf) => `🏃 BLAZING FAST LIKE RUST! Your ${target} compiled in nanoseconds! ⚡`,
  (target, guess, conf) => `📱 CROSS-PLATFORM WIN! Your ${target} works on iOS, Android, Web, Desktop! 🌍`,
  (target, guess, conf) => `🎨 DESIGN SYSTEM APPROVED! Your ${target} follows all accessibility standards! ♿`,
  (target, guess, conf) => `🔬 PEER-REVIEWED EXCELLENCE! Your ${target} passed the strictest lint rules! 📜`,
  (target, guess, conf) => `💡 INNOVATIVE ARCHITECTURE! Your ${target} uses microservices and serverless! 🏗️`,
  (target, guess, conf) => `🚁 DRONE DELIVERY SUCCESS! Your ${target} code is so efficient it's flying! 🛸`,
  (target, guess, conf) => `🎖️ GITHUB STARS INCOMING! Your ${target} is trending on ProductHunt! ⭐`,
  (target, guess, conf) => `🌈 GRADIENT DESCENT PERFECTION! Your ${target} achieved zero loss! 📉`,
  (target, guess, conf) => `🎯 PIXEL-PERFECT ACCURACY! Your ${target} matches the Figma mockup 100%! 🎨`,
  (target, guess, conf) => `🏰 CASTLE-TIER INFRASTRUCTURE! Your ${target} deployment is Fort Knox-level secure! 🔐`,
  (target, guess, conf) => `⚡ QUANTUM-READY! Your ${target} is already optimized for quantum computing! 🌌`,
  (target, guess, conf) => `🎪 CIRCUS SKILLS ENGAGED! Your ${target} juggles 1000 concurrent requests! 🤹`,
  (target, guess, conf) => `🚀 SPACEX STANDARDS MET! Your ${target} launched without a single bug! 🛸`,
  (target, guess, conf) => `💎 DIAMOND TIER DEVOPS! Your ${target} auto-scales with 99.9999% uptime! 📊`,
  (target, guess, conf) => `🎭 SHAKESPEARE-APPROVED SYNTAX! Your ${target} code reads like poetry! 📖`,
  (target, guess, conf) => `🎸 AMPLITUDE MAXIMIZED! Your ${target} signal-to-noise ratio is incredible! 🔊`,
  (target, guess, conf) => `🏆 OLYMPIC GOLD IN PERFORMANCE! Your ${target} beat all benchmarks! 🥇`,
  (target, guess, conf) => `🌍 GLOBALLY DISTRIBUTED! Your ${target} is running on servers in 6 continents! 🌏`,
  (target, guess, conf) => `👨‍💻 STACKOVERFLOW HERO! Someone just upvoted your ${target} solution 10K times! 📈`,
  (target, guess, conf) => `🎯 SHARPSHOOTER ACCURACY! Your ${target} hit the bullseye with ${Math.round(conf * 100)}% precision! 🎪`,
  (target, guess, conf) => `🔥 VIRAL ON DEV.TO! Your ${target} article just hit 50K views! 📰`,
  (target, guess, conf) => `🎖️ KUBERNETES MASTER! Your ${target} scaled horizontally like a dream! ☸️`,
  (target, guess, conf) => `💻 LEETCODE HARD SOLVED! Your ${target} solution is O(n log n) perfection! 🧮`,
  (target, guess, conf) => `🚀 WARP DRIVE ENGAGED! Your ${target} speed is ludicrous! ⚡`,
  (target, guess, conf) => `🎨 FIGMA HANDOFF PERFECT! Your ${target} matches the design system exactly! 🖼️`,
  (target, guess, conf) => `🤖 CHATGPT APPROVED! Even AI thinks your ${target} is perfect! 🧠`,
  (target, guess, conf) => `🎯 BALLISTIC PRECISION! Your ${target} trajectory is mathematically perfect! 📐`,
  (target, guess, conf) => `🏅 ACCESSIBILITY EXCELLENCE! Your ${target} gets 100 on Lighthouse! 💯`,
  (target, guess, conf) => `🌟 TYPESCRIPT STRICT MODE! Your ${target} has ZERO type errors! ✅`,
  (target, guess, conf) => `🚁 HELICOPTER PARENT APPROVED! Your ${target} code is well-documented! 📚`,
  (target, guess, conf) => `💰 VENTURE CAPITALIST DREAMS! Your ${target} is a unicorn-worthy startup! 🦄`,
  (target, guess, conf) => `🎪 ACROBAT-LEVEL PERFORMANCE! Your ${target} is flipping through edge cases flawlessly! 🤸`,
  (target, guess, conf) => `🔮 CRYSTAL CLEAR CODE! Your ${target} is so readable it's magical! ✨`,
  (target, guess, conf) => `🎭 BROADWAY-APPROVED DELIVERY! Your ${target} is the star of the show! 🌟`,
  (target, guess, conf) => `⚙️ MECHANICAL SYMPATHY ACHIEVED! Your ${target} knows CPU cache sizes! 💾`,
  (target, guess, conf) => `🎯 SNIPER ELITE TARGETING! Your ${target} precision is military-grade! 🎯`,
  (target, guess, conf) => `🏰 FORTRESS SECURITY! Your ${target} is protected by 12 layers of encryption! 🔐`,
  (target, guess, conf) => `🌈 FULL SPECTRUM COVERAGE! Your ${target} passes 100% test coverage! ✅`,
  (target, guess, conf) => `🚀 FALCON 9 LAUNCH SUCCESS! Your ${target} deployed flawlessly! 🛸`,
  (target, guess, conf) => `💎 BLOCKCHAIN CERTIFIED! Your ${target} is audited and immutable! ⛓️`,
  (target, guess, conf) => `🎸 HENDRIX-LEVEL SHRED! Your ${target} code shreds the performance benchmark! 🎼`,
  (target, guess, conf) => `📡 SIGNAL STRENGTH MAXIMUM! Your ${target} transmission is crystal clear! 📶`,
  (target, guess, conf) => `🎯 PRECISION ENGINEERING! Your ${target} is machined to 0.001mm tolerances! ⚙️`,
];

const funnyLosses = [
  (target, guess) => `❌ SEGFAULT! We asked for ${target}, but you committed ${guess}. Please rollback! 🛑`,
  (target, guess) => `🐛 MERGE CONFLICT! Expected ${target}, got ${guess}. Do not push this to main! 💻`,
  (target, guess) => `⚠️ 404 NOT FOUND! That's not a ${target}, that's an unhandled exception named ${guess}! 🖥️`,
  (target, guess) => `💥 KERNEL PANIC! We requested ${target}, your code outputted ${guess}. Syntax error! 🛠️`,
  (target, guess) => `🗑️ EXCEPTION THROWN! Looked like a ${target}, but runtime evaluated it as ${guess}! 📉`,
  (target, guess) => `🔥 INFINITE LOOP! Your ${target} attempt got stuck evaluating ${guess}! 🌀`,
  (target, guess) => `🛑 GARBAGE COLLECTION ERROR! We tried to parse ${target}, but collected ${guess} instead! 🗑️`,
  (target, guess) => `📉 MEMORY LEAK DETECTED! Your ${guess} drawing caused a stack overflow trying to look like a ${target}! ⚠️`,
  (target, guess) => `⚡ NULL POINTER EXCEPTION! Your ${target} pointer landed on ${guess}! 💀`,
  (target, guess) => `🚫 BUFFER OVERFLOW! You tried to draw ${target}, but wrote ${guess} outside allocated memory! 🛡️`,
  (target, guess) => `❌ TYPE MISMATCH! Expected string '${target}', got undefined '${guess}'! 📝`,
  (target, guess) => `🎯 OFF BY ONE! You were so close to ${target}, but got ${guess} instead! 📍`,
  (target, guess) => `🔴 RUNTIME ERROR! Call stack exceeded trying to render ${target} as ${guess}! 📚`,
  (target, guess) => `⚙️ LOGIC ERROR! Your algorithm returned ${guess} when it should've returned ${target}! 🤖`,
  (target, guess) => `🐌 TIMEOUT! The AI was still evaluating ${guess} when we needed ${target}! ⏱️`,
  (target, guess) => `🔗 DEADLOCK! Your ${guess} and ${target} resources can't agree on access! 🔒`,
  (target, guess) => `💾 CORRUPTED DATA! File corrupted: expected '${target}', found '${guess}'! 📂`,
  (target, guess) => `🚨 RACE CONDITION! Two threads drew ${guess} and ${target} simultaneously! 🏁`,
  (target, guess) => `🧩 MISSING DEPENDENCY! Your ${target} module can't import ${guess}! 📦`,
  (target, guess) => `🎪 STACK SMASHING DETECTED! Your ${guess} sketch smashed through the ${target} stack frame! 🔴`,
  (target, guess) => `📡 PACKET LOSS! Your ${target} transmission was lost and replaced with ${guess}! 📶`,
  (target, guess) => `🔐 AUTHENTICATION FAILED! Only authorized users can draw ${target}, not ${guess}! 🚫`,
  (target, guess) => `⚠️ DEPRECATED API! Your ${target} method is deprecated, please use ${guess} instead! ⚰️`,
  (target, guess) => `🌐 DNS RESOLUTION ERROR! Cannot resolve ${target} to ${guess}! 🌍`,
  (target, guess) => `💥 SYSTEM CRASH! Blue screen of death while processing your ${guess} ${target} attempt! 🔵`,
  (target, guess) => `🐛 UNDEFINED BEHAVIOR! Rendering ${target} as ${guess} invoked undefined behavior! ⚡`,
  (target, guess) => `🎬 FRAME DROP! Your ${target} rendering got dropped frames and became ${guess}! 📉`,
  (target, guess) => `🔊 AUDIO DISTORTION! Your ${target} sketch has audio artifacts rendering as ${guess}! 🎙️`,
  (target, guess) => `📊 DATA CORRUPTION! Checksum failed: ${target} !== ${guess}! ❌`,
  (target, guess) => `🛡️ SECURITY VIOLATION! Attempted to draw ${target}, but it's a restricted resource! Got ${guess} instead! 🔒`,
  (target, guess) => `🚫 ACCESS DENIED! Permission denied: user 'artist' cannot draw ${target}! 🚪`,
  (target, guess) => `⚙️ MECHANICAL FAILURE! Robot arm malfunction: aimed for ${target}, hit ${guess}! 🤖`,
  (target, guess) => `🎨 COLOR SPACE MISMATCH! RGB expected ${target}, got CMYK ${guess}! 🌈`,
  (target, guess) => `🔌 POWER FAILURE! Circuit breaker tripped while drawing ${target}! Generated ${guess} with emergency power! ⚡`,
  (target, guess) => `📡 SIGNAL INTERFERENCE! ${target} signal intercepted by ${guess} noise! 🛰️`,
  (target, guess) => `🧮 ARITHMETIC OVERFLOW! Calculation for ${target} overflowed into ${guess}! 🔢`,
  (target, guess) => `🌀 FLOATING POINT PRECISION! ${target} lost precision and became ${guess}! 🔍`,
  (target, guess) => `🗺️ COORDINATE ERROR! GPS placed ${target} at wrong coordinates, found ${guess} instead! 🧭`,
  (target, guess) => `⏰ TIMESTAMP MISMATCH! ${target} created at wrong time, corrupted to ${guess}! 🕐`,
  (target, guess) => `🎯 AIM ASSIST FAILED! Tried to auto-aim for ${target}, but hit ${guess}! 🎮`,
  (target, guess) => `🔴 STOP CONDITION NOT MET! Loop kept running, ${guess} instead of ${target}! 🔄`,
  (target, guess) => `📉 DOWNSAMPLING ARTIFACT! ${target} was downsampled into ${guess}! 🖼️`,
  (target, guess) => `🎪 CIRCUS CATASTROPHE! Juggling went wrong: tried ${target}, dropped ${guess}! 🤹`,
  (target, guess) => `⚡ ELECTRICAL STORM! Lightning struck your ${target}, turned it into ${guess}! ⛈️`,
  (target, guess) => `🔗 CHAIN REACTION FAILURE! ${target} depended on ${guess}, which failed first! 🔗`,
  (target, guess) => `🌊 DATA TSUNAMI! Buffer overflow created a tidal wave from ${target} to ${guess}! 🌊`,
  (target, guess) => `🎭 CASE SENSITIVITY ERROR! 'ELEPHANT' !== 'elephant' when you drew ${guess} for ${target}! 📝`,
  (target, guess) => `🚀 ROCKET MISFIRE! Aimed for ${target}, but rocket launched toward ${guess}! 🛸`,
  (target, guess) => `💔 HEART OF GOLD CORRUPTED! Expected wholesome ${target}, got cynical ${guess}! 💀`,
  (target, guess) => `🌺 ENCODING ERROR! UTF-8 couldn't encode ${target}, rendered as mojibake ${guess}! 🔤`,
  (target, guess) => `🔬 QUANTUM SUPERPOSITION COLLAPSED! ${target} and ${guess} entangled incorrectly! 🌌`,
];

const veryLowConfidence = [
  'Stack Overflow doesn\'t even have an answer for this code! 🤡',
  'Infinite loop detected! AI has frozen looking at this masterpiece! 🔄',
  'Code review failed catastrophically! Please refactor immediately! 💻🔥',
  'Your code is so spaghetti even the compiler gave up! 🍝🤖',
  'Error 418: I am a teapot, and this certainly is not what was requested! 🫖❌',
  'Even ChatGPT is confused by this drawing! 🤖❓',
  'Is this art or a security vulnerability? Neural network can\'t decide! 🎨🔓',
  'CTRL+Z recommended IMMEDIATELY! This is a cry for help! 🆘',
  'Did you draw this with your feet? 🦶',
  'This broke the Turing test! 🤖💔',
  'Your IDE is now questioning its life choices! 😭',
  'Even the AI debugger is debugging itself! 🐛🐛',
  'This code has achieved sentience and regrets it! 🧠',
  'Antivirus software flagged this as a potential threat! 🦠',
  'The compiler called in IT support! 📞',
  'This triggered all 47 ESLint warnings at once! 🚨',
  'Your Git history would be marked NSFW! 🔞',
  'This is what chaos theory looks like in code! 🌀',
  'The CSS debugger needs therapy after this! 👨‍⚕️',
  'Your variable names gave me an existential crisis! 🌀',
  'This makes the famous Göto considered a best practice! 🎯',
  'Even Linus Torvalds would say "WTF"! 😤',
  'This violates the Geneva Convention of Code Style! 📜',
  'The rubber duck is confused and won\'t debug this! 🦆',
  'Performance profiler returned NaN (Not a Number, Not Any Code)! 🔢',
  'This code would make a regex enthusiast cry! 😭',
  'The error message is too embarrassed to show itself! 🙈',
  'Package.json dependencies are filing a restraining order! 📦',
  'The linter just uninstalled itself! 🗑️',
  'This created a temporal paradox in the test suite! ⏰',
  'AI confidence dropped below room temperature! 🌡️',
  'The neural network performed a full system reboot! 🔄',
];

export function getResultMessage(target, guess, confidence, isWin) {
  if (!isWin && confidence < 0.3) {
    return {
      main: veryLowConfidence[Math.floor(Math.random() * veryLowConfidence.length)],
      subtitle: `Runtime Error: Expected ${target}, but got total chaos! 💥`,
    };
  }

  if (isWin) {
    const msg = funnyWins[Math.floor(Math.random() * funnyWins.length)](target, guess, confidence);
    return {
      main: msg,
      subtitle: `Optimized with ${getRandomTech()} & ready for production! 🚀`,
    };
  }

  const msg = funnyLosses[Math.floor(Math.random() * funnyLosses.length)](target, guess);
  return {
    main: msg,
    subtitle: `Failed code review: Requested ${target.toUpperCase()}, processed as ${guess.toUpperCase()}! 🛑`,
  };
}

// Get emoji for object
export function getEmoji(object) {
  const emojis = {
    elephant: '🐘',
    car: '🚗',
    house: '🏠',
    tree: '🌳',
    rocket: '🚀',
    fish: '🐟',
    dog: '🐶',
    cat: '🐱',
    lion: '🦁',
    airplane: '✈️',
    flower: '🌸',
    sun: '☀️',
    boat: '⛵',
    apple: '🍎',
    'ice cream': '🍦',
    bicycle: '🚲',
    pizza: '🍕',
    star: '⭐',
    cloud: '☁️',
    mountain: '⛰️',
    ocean: '🌊',
    bridge: '🌉',
    lighthouse: '🗼',
    castle: '🏰',
    dinosaur: '🦕',
    ghost: '👻',
    robot: '🤖',
    alien: '👽',
    spider: '🕷️',
    butterfly: '🦋',
    penguin: '🐧',
    whale: '🐋',
    shark: '🦈',
    eagle: '🦅',
    turtle: '🐢',
    snake: '🐍',
    pig: '🐷',
    cow: '🐄',
    sheep: '🐑',
    duck: '🦆',
    swan: '🦢',
    owl: '🦉',
    cactus: '🌵',
    mushroom: '🍄',
    palm: '🌴',
    fire: '🔥',
    lightning: '⚡',
    rainbow: '🌈',
    snowflake: '❄️',
  };
  return emojis[object.toLowerCase()] || '✏️';
}
// LOCAL demo learning content. Hand-written notes and quizzes for Full-Stack topics;
// every other topic gets an honest self-check generated from the roadmap structure.
// Nothing here comes from an AI model.

const q = (text, options, answer, explain) => ({ q: text, options, answer, explain })

const FULLSTACK = {
  html: {
    notes: [
      'Semantic elements such as <header>, <nav>, <main>, <section> and <footer> describe what content is, not how it looks.',
      'Every form control needs a <label>, and every meaningful image needs alt text, so assistive technology can describe the page.',
      'Use one <h1> and nest headings in order; headings form the outline of the page.',
    ],
    quiz: [
      q('Which element best represents the main navigation links of a page?', ['<div class="links">', '<nav>', '<span>', '<section>'], 1, '<nav> is semantic: browsers and screen readers know it contains navigation.'),
      q('Why should every form input have an associated <label>?', ['It makes the input bigger', 'CSS needs it to work', 'It identifies the input for screen readers and widens the click target', 'It submits the form automatically'], 2, 'Labels give inputs an accessible name and let users click the text to focus the field.'),
      q('Which attribute gives an image a text alternative?', ['title', 'alt', 'src', 'caption'], 1, 'The alt attribute is read by screen readers and shown if the image fails to load.'),
      q('Which heading structure is best for a page?', ['One h1 followed by nested h2 sections', 'Many h1 elements for styling', 'Only h6 elements', 'Headings in random order'], 0, 'Headings form an outline. Use one h1 and nest levels logically; style with CSS instead.'),
    ],
  },
  css: {
    notes: [
      'Flexbox lays items out in one dimension (a row or column); grid handles rows and columns together.',
      'Media queries such as @media (max-width: 600px) apply styles only when the viewport matches, which is how layouts become responsive.',
      'box-sizing: border-box makes width include padding and border, which makes sizing predictable.',
    ],
    quiz: [
      q('Which CSS puts items in a row with space between them?', ['display: flex; justify-content: space-between;', 'display: block; float: none;', 'position: fixed;', 'text-align: justify;'], 0, 'display: flex creates a flex row by default and justify-content distributes the free space.'),
      q('What does @media (max-width: 600px) do?', ['Limits the file size', 'Applies its styles only on viewports 600px wide or narrower', 'Loads images lazily', 'Blocks scripts'], 1, 'A media query conditionally applies styles, the basis of responsive design.'),
      q('Which declaration creates two equal columns with CSS grid?', ['grid-template-columns: 1fr 1fr;', 'columns: grid;', 'display: table-cell;', 'flex-direction: grid;'], 0, 'Each 1fr takes an equal share of the available space.'),
      q('Which box-sizing value makes width include padding and border?', ['content-box', 'border-box', 'padding-box', 'inherit-box'], 1, 'border-box includes padding and border inside the declared width.'),
    ],
  },
  js: {
    notes: [
      'Use const by default, let when a value must change, and avoid var.',
      'Array methods like map, filter and reduce transform data without manual loops.',
      'Prefer === over ==; strict equality never coerces types behind your back.',
    ],
    quiz: [
      q('What does [1, 2, 3].map((n) => n * 2) return?', ['[2, 4, 6]', '[1, 2, 3]', '6', 'undefined'], 0, 'map returns a new array with the callback applied to each item.'),
      q('Which comparison avoids type coercion?', ['==', '===', '=', '!='], 1, '=== compares value and type without coercion.'),
      q('What does console.log(typeof []) print?', ['array', 'object', 'list', 'undefined'], 1, 'Arrays are objects in JavaScript. Use Array.isArray() to detect them.'),
      q('Which keyword declares a variable that cannot be reassigned?', ['var', 'let', 'const', 'static'], 2, 'const prevents reassignment of the binding.'),
    ],
  },
  git: {
    notes: [
      'git add stages changes, git commit saves a snapshot, git push shares it.',
      'Branches let you work on a feature without disturbing main; git switch moves between them.',
      'git status and git log are your first stops when you are unsure what state you are in.',
    ],
    quiz: [
      q('Which command records staged changes as a snapshot?', ['git push', 'git commit', 'git pull', 'git add'], 1, 'git commit saves what you staged. git add only stages.'),
      q('What do "git branch feature" then "git switch feature" achieve?', ['Delete main', 'Create a new branch and move onto it', 'Upload code', 'Revert the last commit'], 1, 'The first command creates the branch and the second makes it the active one.'),
      q('What is git pull roughly equal to?', ['fetch + merge', 'commit + push', 'add + commit', 'stash + drop'], 0, 'git pull downloads remote changes (fetch) and integrates them (merge).'),
      q('Which command shows which files changed?', ['git status', 'git remote', 'git init', 'git tag'], 0, 'git status lists staged, unstaged and untracked files.'),
    ],
  },
  dom: {
    notes: [
      'document.querySelector finds elements with CSS selectors; addEventListener reacts to user actions.',
      'Set text with textContent. innerHTML parses markup and can open the door to script injection.',
      'Event delegation: listen on a parent and inspect event.target instead of attaching many listeners.',
    ],
    quiz: [
      q('Which method selects the first element that matches a CSS selector?', ['document.querySelector', 'document.getAll', 'document.find', 'document.select'], 0, 'querySelector takes any CSS selector and returns the first match.'),
      q('What does addEventListener("click", fn) do?', ['Runs fn immediately', 'Runs fn every time the element is clicked', 'Clicks the element', 'Removes the element'], 1, 'The handler runs on each click event.'),
      q('Which property sets text without parsing it as HTML?', ['innerHTML', 'textContent', 'outerHTML', 'insertHTML'], 1, 'textContent treats input as plain text, so injected markup is not executed.'),
      q('What is event delegation?', ['Handling events on a parent for many children', 'Delaying an event', 'Cancelling events', 'Copying events'], 0, 'One listener on a parent can serve many children by checking event.target.'),
    ],
  },
  async: {
    notes: [
      'A promise represents a value that will arrive later; async/await lets you write that flow top to bottom.',
      'fetch only rejects on network failure. For HTTP errors you must check response.ok yourself.',
      'Use try/catch around awaited calls and Promise.all to run independent requests in parallel.',
    ],
    quiz: [
      q('What does await do inside an async function?', ['Pauses that function until the promise settles', 'Blocks the whole browser', 'Creates a new thread', 'Cancels the promise'], 0, 'Only the async function pauses; the rest of the page keeps running.'),
      q('When does fetch() reject its promise?', ['On an HTTP 404', 'On an HTTP 500', 'On a network failure', 'On any non-200 status'], 2, 'HTTP error statuses still resolve. Check response.ok to detect them.'),
      q('How do you handle a failed awaited call?', ['try / catch', 'if / else only', 'switch', 'break'], 0, 'A rejected promise throws at the await, so try/catch handles it.'),
      q('Which runs several requests in parallel and waits for all of them?', ['Promise.all', 'Promise.one', 'a sequential await loop', 'setTimeout'], 0, 'Promise.all starts them together; an await loop would run them one at a time.'),
    ],
  },
  react: {
    notes: [
      'Components are functions that return UI; props flow down and are read-only.',
      'useState holds data that changes; call the setter instead of mutating the value.',
      'Lists need a stable key, and useEffect runs side effects such as data fetching after render.',
    ],
    quiz: [
      q('How do you update state in a function component?', ['Mutate the variable directly', 'Call the setter returned by useState', 'Reassign props', 'Edit the DOM by hand'], 1, 'The setter schedules a re-render with the new value.'),
      q('Why does each item in a rendered list need a key?', ['For styling', 'So React can track items between renders', 'To make them clickable', 'It is only decoration'], 1, 'Stable keys let React match old and new items correctly.'),
      q('What are props?', ['Read-only inputs passed from a parent', 'Mutable local state', 'Global variables', 'CSS classes'], 0, 'Props flow downward and should not be modified by the child.'),
      q('When does useEffect with an empty dependency array run?', ['After every render', 'Once after the first render', 'Never', 'Before rendering'], 1, 'An empty array means no dependencies, so it runs only on mount.'),
    ],
  },
  router: {
    notes: [
      'A client-side router swaps what is shown based on the URL without reloading the page.',
      'Route parameters (for example /users/:id) are read with hooks like useParams.',
      'State shared by several routes belongs in a common parent or context. Add a not-found route for unknown URLs.',
    ],
    quiz: [
      q('What does a client-side router do?', ['Reloads the page for each URL', 'Changes what is shown based on the URL without a full reload', 'Stores passwords', 'Compiles JSX'], 1, 'It keeps the app loaded and renders different components per URL.'),
      q('In React Router, how do you read the :id in /users/:id?', ['useParams', 'useState', 'useRef', 'useMemo'], 0, 'useParams returns the dynamic segments of the matched route.'),
      q('Where should state shared by several routes live?', ['In a common parent or context', 'Duplicated in each page', 'In CSS', 'In index.html'], 0, 'Lifting state up keeps one source of truth.'),
      q('What should the app show for an unknown URL?', ['A blank page', 'A not-found route', 'A crash', 'The previous page, silently'], 1, 'A catch-all route gives users a clear message and a way back.'),
    ],
  },
  node: {
    notes: [
      'Node.js runs JavaScript outside the browser, so the same language can power your server.',
      'HTTP basics: GET reads, POST creates, PUT/PATCH updates, DELETE removes. Status codes report the outcome (200 OK, 404 Not Found, 500 server error).',
      'Read configuration such as the port from process.env rather than hard-coding it.',
    ],
    quiz: [
      q('What is Node.js?', ['A JavaScript runtime outside the browser', 'A CSS framework', 'A database', 'A web browser'], 0, 'Node lets you run JavaScript on servers and in tooling.'),
      q('Which HTTP method is conventionally used to read data?', ['POST', 'GET', 'DELETE', 'PUT'], 1, 'GET requests are for reading and should not change data.'),
      q('Which status code means "Not Found"?', ['200', '301', '404', '500'], 2, '404 means the resource does not exist at that URL.'),
      q('What does process.env.PORT usually hold?', ['Configuration from the environment, such as the port', 'The file system', 'The request body', 'A database row'], 0, 'Environment variables keep configuration out of the code.'),
    ],
  },
  rest: {
    notes: [
      'Model endpoints around resources: GET /users, POST /users, GET /users/:id, PUT /users/:id, DELETE /users/:id.',
      'Parse JSON bodies with express.json(), validate input on the server, and return clear status codes and error messages.',
      'Never trust the client: validate and sanitise every request.',
    ],
    quiz: [
      q('Which route best matches "create a user"?', ['GET /users', 'POST /users', 'DELETE /users', 'PUT /health'], 1, 'POST on the collection creates a new resource.'),
      q('Why validate request bodies on the server?', ['Clients can send bad or malicious data', 'It speeds up CSS', 'Browsers already do it', 'To reduce file size'], 0, 'Client-side checks can be bypassed, so the server must validate.'),
      q('Which status code fits a successful creation?', ['200', '201', '404', '204'], 1, '201 Created tells the client a new resource now exists.'),
      q('What does the express.json() middleware do?', ['Parses JSON request bodies', 'Formats responses as XML', 'Starts the server', 'Hashes passwords'], 0, 'It populates req.body from JSON payloads.'),
    ],
  },
  db: {
    notes: [
      'Tables hold rows; a primary key uniquely identifies each row and foreign keys link tables.',
      'SELECT ... WHERE filters, JOIN combines tables, and ORDER BY / LIMIT shape the result.',
      'Always use parameterised queries so user input can never become SQL.',
    ],
    quiz: [
      q('Which SQL clause filters rows?', ['WHERE', 'ORDER BY', 'GROUP BY', 'LIMIT'], 0, 'WHERE keeps only rows that match a condition.'),
      q('What does a primary key guarantee?', ['Each row has a unique identifier', 'Rows are sorted alphabetically', 'Data is encrypted', 'Columns may be null'], 0, 'A primary key is unique and not null for every row.'),
      q('Which join returns only rows that match in both tables?', ['INNER JOIN', 'CROSS JOIN', 'FULL OUTER JOIN', 'UNION'], 0, 'INNER JOIN keeps rows with a match on both sides.'),
      q('How do you protect against SQL injection?', ['Use parameterised queries', 'Concatenate user input into SQL strings', 'Hide table names', 'Use longer passwords'], 0, 'Parameters keep data separate from the query text.'),
    ],
  },
  auth: {
    notes: [
      'Authentication proves who a user is; authorization decides what they may do.',
      'Hash passwords with a slow, salted algorithm such as bcrypt or argon2. Never store them in plain text.',
      'Keep session tokens in HttpOnly cookies and protect state-changing requests against CSRF.',
    ],
    quiz: [
      q('How should passwords be stored?', ['In plain text', 'Hashed with a slow salted algorithm such as bcrypt', 'Base64 encoded', 'Encrypted with a key shipped to the client'], 1, 'Hashing is one-way, and slow salted hashes resist brute force.'),
      q('Where is a session token safest in a browser?', ['An HttpOnly cookie', 'A global JavaScript variable', 'The URL', 'An HTML comment'], 0, 'HttpOnly cookies cannot be read by page scripts, which limits XSS theft.'),
      q('What does authorization decide?', ['What an authenticated user is allowed to do', 'Whether a password is long enough', 'The page font', 'Server speed'], 0, 'Authentication is who you are; authorization is what you may do.'),
      q('What does a CSRF token protect against?', ['Forged requests from another site using the user\'s session', 'Slow queries', 'Typos', 'Large uploads'], 0, 'The token proves the request came from your own page.'),
    ],
  },
  integrate: {
    notes: [
      'Browsers block cross-origin requests unless the API sends CORS headers that allow your frontend origin.',
      'Keep the API base URL in configuration, and always handle loading, success and error states in the UI.',
      'Test the full flow in the browser: form, request, database, response, rendered result.',
    ],
    quiz: [
      q('Why configure CORS on the API?', ['Browsers block cross-origin requests unless the server allows them', 'To compress responses', 'To hash data', 'To enable HTTPS'], 0, 'CORS headers tell the browser which origins may call your API.'),
      q('Where should the API base URL live?', ['In an environment variable or config', 'Hard-coded in every component', 'In the database', 'In CSS'], 0, 'Config makes switching between local and production easy.'),
      q('What should the UI show while data loads?', ['A loading state', 'Nothing, and freeze', 'An alert on every keystroke', 'A blank page'], 0, 'Loading states tell users the app is working.'),
      q('If the API returns an error, the client should...', ['Show a clear error and let the user retry', 'Ignore it', 'Crash', 'Delete local data'], 0, 'Handled errors keep the app usable.'),
    ],
  },
  test: {
    notes: [
      'Unit tests check small pieces in isolation; integration tests check pieces working together.',
      'Arrange, Act, Assert: set up data, run the code, check the result.',
      'Mock slow or unreliable external services so tests stay fast and repeatable. Fix flaky tests rather than rerunning them.',
    ],
    quiz: [
      q('Which type of test checks one small function in isolation?', ['Unit test', 'End-to-end test', 'Load test', 'Smoke test'], 0, 'Unit tests isolate a small piece of logic.'),
      q('Why mock an external API in tests?', ['Tests stay fast and deterministic', 'To avoid writing assertions', 'To skip code', 'To test the network'], 0, 'Mocks remove network flakiness and cost.'),
      q('Which follows Arrange-Act-Assert?', ['Set up data, run the code, check the result', 'Run, hope, commit', 'Assert, then arrange', 'Act only'], 0, 'AAA keeps tests readable and focused.'),
      q('A test that sometimes passes and sometimes fails is...', ['Flaky and should be fixed', 'Fine as it is', 'Proof of full coverage', 'A unit test'], 0, 'Flaky tests erode trust, so find the nondeterminism.'),
    ],
  },
  deploy: {
    notes: [
      'Continuous integration runs your build and tests automatically on every push.',
      'Keep secrets in environment variables or a secret manager, never in the repository.',
      'npm run build produces optimised files for production. Keep a rollback plan for bad releases.',
    ],
    quiz: [
      q('What does CI do on each push?', ['Automatically builds and tests the code', 'Deletes old branches', 'Writes features', 'Hides secrets in code'], 0, 'CI gives fast feedback that a change did not break the build.'),
      q('Where do API keys and other secrets belong?', ['Environment variables or a secret manager', 'In the repository', 'In client JavaScript', 'In the README'], 0, 'Secrets committed to a repository are effectively public.'),
      q('What does npm run build typically produce?', ['Optimised static files for production', 'A database', 'Unit tests', 'A git commit'], 0, 'The build step bundles and minifies the app for deployment.'),
      q('Why keep a rollback plan?', ['So you can restore the previous version if a release breaks', 'To skip testing', 'To speed up builds', 'To rename files'], 0, 'Fast rollback limits the damage of a bad deploy.'),
    ],
  },
}

function hash(str) {
  let h = 0
  for (const ch of str) h = (h * 31 + ch.charCodeAt(0)) >>> 0
  return h
}

// Rotates the options so the correct answer is not always in the same slot (deterministic per question).
function rotate(item) {
  const shift = hash(item.q) % item.options.length
  const options = item.options.map((_, i) => item.options[(i + shift) % item.options.length])
  return { ...item, options, answer: options.indexOf(item.options[item.answer]) }
}

const pick = (arr, n, skip) => arr.filter((x) => !skip.includes(x)).slice(0, n)

// Self-check built purely from the roadmap's own structure. Honest, not subject-expert content.
function structuralQuiz(roadmap, topic) {
  const others = roadmap.topics.filter((t) => t.id !== topic.id)
  const start = Math.max(0, roadmap.topics.indexOf(topic))
  const rotated = [...others.slice(start % others.length), ...others.slice(0, start % others.length)]
  const mine = roadmap.milestones.find((m) => m.id === topic.milestoneId)
  const unlocks = roadmap.topics.filter((t) => t.prerequisites.includes(topic.id))
  const name = topic.name

  const items = []
  items.push(q(
    `Which learning objective belongs to "${name}"?`,
    [topic.objective, ...pick(rotated.map((t) => t.objective), 3, [topic.objective])], 0,
    `In this roadmap the objective of "${name}" is: ${topic.objective}`))
  items.push(q(
    `Which milestone contains "${name}"?`,
    [mine.title, ...pick(roadmap.milestones.map((m) => m.title), 3, [mine.title])], 0,
    `"${name}" is part of the milestone "${mine.title}".`))
  if (topic.prerequisites.length) {
    const pre = roadmap.topics.find((t) => t.id === topic.prerequisites[0])
    items.push(q(
      `Which topic must be completed before "${name}"?`,
      [pre.name, ...pick(rotated.filter((t) => !topic.prerequisites.includes(t.id)).map((t) => t.name), 3, [pre.name])], 0,
      `"${pre.name}" is a prerequisite of "${name}" in this roadmap.`))
  } else if (unlocks.length) {
    items.push(q(
      `Which topic does "${name}" unlock?`,
      [unlocks[0].name, ...pick(rotated.filter((t) => !unlocks.includes(t)).map((t) => t.name), 3, [unlocks[0].name])], 0,
      `Completing "${name}" helps unlock "${unlocks[0].name}".`))
  } else {
    items.push(q(
      `How many prerequisites does "${name}" have?`,
      ['0', '1', '2', '3'], 0, `"${name}" has no prerequisites.`))
  }
  items.push(q(
    'Which approach best shows you have met this topic\'s objective?',
    ['Explain it in your own words and complete a practice task that uses it', 'Re-read the title only', 'Skip ahead to the next topic', 'Memorise the list of topic names'], 0,
    'Explaining and applying an idea is a stronger check than recognising it.'))
  return items
}

/** Returns { notes, quiz, source } for a topic. */
export function getTopicContent(roadmap, topic) {
  const key = topic.id.replace(/^fullstack-/, '')
  const hand = topic.id.startsWith('fullstack-') ? FULLSTACK[key] : null

  if (hand) {
    return { source: 'handwritten', notes: hand.notes, quiz: hand.quiz.map(rotate) }
  }
  return {
    source: 'fallback',
    notes: [
      `Objective: ${topic.objective}`,
      topic.prerequisites.length
        ? `This builds on: ${topic.prerequisites.map((p) => roadmap.topics.find((t) => t.id === p).name).join(', ')}.`
        : 'This is a starting topic with no prerequisites.',
      `Plan about ${topic.estimatedHours} hours. Study it with your own books, course or teacher, then take the self-check.`,
    ],
    quiz: structuralQuiz(roadmap, topic).map(rotate),
  }
}

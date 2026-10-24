// Structured roadmap templates used by the LOCAL demo generator (no AI model involved).
// Shape: milestones[] -> topics[]. Topic `key`s are unique within a template and `prereqs`
// reference keys that appear EARLIER in the template.
// `tier`: the learner level index (0-3) at which the topic is assumed known.
// A topic is dropped when the learner's level index is greater than its tier (default 3 = never dropped).

const t = (key, name, objective, prereqs = [], tier) => ({ key, name, objective, prereqs, tier })

const fullstack = {
  id: 'fullstack',
  label: 'Full-stack web development',
  milestones: [
    { key: 'web', title: 'Web foundations', summary: 'Structure, style and script a page.', topics: [
      t('html', 'HTML structure and semantics', 'Build well-structured pages with semantic elements, forms and accessibility basics.', [], 0),
      t('css', 'CSS layout and responsive design', 'Lay out pages with flexbox and grid and make them work on any screen.', ['html'], 0),
      t('js', 'JavaScript fundamentals', 'Use variables, functions, arrays, objects and control flow to solve small problems.', ['html'], 1),
      t('git', 'Git and the command line', 'Track changes, branch and merge, and move around the terminal confidently.', [], 1),
    ] },
    { key: 'front', title: 'Frontend engineering', summary: 'Build interactive interfaces.', topics: [
      t('dom', 'DOM and events', 'Read and update the page from JavaScript in response to user events.', ['js', 'html']),
      t('async', 'Async JavaScript and fetch', 'Call APIs with promises and async/await and handle loading and errors.', ['js']),
      t('react', 'React components and state', 'Compose components, manage state and render lists and forms.', ['dom', 'css']),
      t('router', 'Routing and app structure', 'Organise a multi-page single-page app with routes and shared state.', ['react']),
    ] },
    { key: 'back', title: 'Backend and data', summary: 'Serve data and keep it safe.', topics: [
      t('node', 'Node.js and HTTP basics', 'Understand requests, responses and run JavaScript on the server.', ['js', 'async']),
      t('rest', 'REST APIs with Express', 'Design and implement CRUD endpoints with validation and error handling.', ['node']),
      t('db', 'Databases and SQL', 'Model data in tables, write queries and connect a database to your API.', ['node']),
      t('auth', 'Authentication and security basics', 'Hash passwords, manage sessions or tokens and avoid common vulnerabilities.', ['rest', 'db']),
    ] },
    { key: 'ship', title: 'Ship a product', summary: 'Join the pieces and put them online.', topics: [
      t('integrate', 'Connect frontend to backend', 'Wire a React client to your API end to end.', ['router', 'rest']),
      t('test', 'Testing essentials', 'Write unit and integration tests for the parts that matter most.', ['integrate']),
      t('deploy', 'Deployment and CI', 'Deploy the app and automate checks on every push.', ['test', 'git']),
    ] },
  ],
}

const gate = {
  id: 'gate',
  label: 'GATE preparation',
  note: 'This template follows the GATE Computer Science syllabus. Swap in your own branch subjects as you study.',
  milestones: [
    { key: 'math', title: 'Maths and aptitude', summary: 'Scoring areas shared across papers.', topics: [
      t('dm', 'Discrete mathematics', 'Handle logic, sets, relations, graphs and combinatorics problems.', [], 2),
      t('la', 'Linear algebra and calculus', 'Solve problems on matrices, eigenvalues, limits and integration.', [], 2),
      t('prob', 'Probability and statistics', 'Apply conditional probability, distributions and expectation.', ['la'], 2),
      t('apt', 'General aptitude', 'Practise verbal and numerical reasoning at exam speed.', [], 2),
    ] },
    { key: 'prog', title: 'Programming and algorithms', summary: 'The code-centred core.', topics: [
      t('cprog', 'C programming and recursion', 'Trace pointers, arrays and recursive programs by hand.', [], 1),
      t('ds', 'Data structures', 'Implement and analyse stacks, queues, trees, heaps and hashing.', ['cprog']),
      t('algo', 'Algorithm design and analysis', 'Use greedy, divide and conquer and dynamic programming with complexity analysis.', ['ds', 'dm']),
    ] },
    { key: 'sys', title: 'Systems', summary: 'Hardware up to networks.', topics: [
      t('digital', 'Digital logic', 'Design combinational and sequential circuits.', ['dm'], 1),
      t('coa', 'Computer organization', 'Reason about pipelines, caches and instruction formats.', ['digital']),
      t('os', 'Operating systems', 'Solve scheduling, synchronization, deadlock and memory management problems.', ['coa', 'ds']),
      t('dbms', 'Databases and SQL', 'Use normalization, transactions and relational algebra.', ['ds', 'dm']),
      t('cn', 'Computer networks', 'Work through layered protocols, routing and congestion control.', ['os']),
    ] },
    { key: 'theory', title: 'Theory of computation and compilers', summary: 'Formal languages and translation.', topics: [
      t('toc', 'Theory of computation', 'Classify languages with automata, grammars and decidability.', ['dm']),
      t('cd', 'Compiler design', 'Apply parsing, syntax-directed translation and code optimisation.', ['toc', 'ds']),
    ] },
    { key: 'exam', title: 'Exam practice', summary: 'Convert knowledge into marks.', topics: [
      t('pyq', 'Previous-year question practice', 'Solve past papers by topic and log recurring mistakes.', ['algo', 'os', 'dbms', 'cn', 'cd']),
      t('mocks', 'Full-length mock tests', 'Build time management with timed papers and post-test analysis.', ['pyq']),
    ] },
  ],
}

const jee = {
  id: 'jee',
  label: 'JEE preparation',
  milestones: [
    { key: 'maths', title: 'Mathematics core', summary: 'Tools every JEE subject leans on.', topics: [
      t('alg', 'Algebra: quadratics, sequences and complex numbers', 'Solve equations, series and complex-number problems fluently.', [], 1),
      t('trig', 'Trigonometry and coordinate geometry', 'Use identities and the geometry of lines, circles and conics.', [], 1),
      t('calc', 'Calculus: limits, differentiation, integration', 'Differentiate and integrate to find extrema, areas and rates.', ['alg', 'trig']),
      t('vec', 'Vectors and 3D geometry', 'Use dot and cross products to solve geometry and mechanics problems.', ['trig']),
      t('permprob', 'Permutations and probability', 'Count arrangements and compute probabilities under constraints.', ['alg']),
    ] },
    { key: 'phys', title: 'Physics', summary: 'From motion to modern physics.', topics: [
      t('mech', 'Kinematics and laws of motion', 'Model motion in one and two dimensions with Newton\'s laws.', ['vec', 'calc']),
      t('energy', 'Work, energy and rotational motion', 'Apply conservation laws and torque to rigid-body problems.', ['mech']),
      t('elec', 'Electrostatics and current electricity', 'Compute fields, potentials and circuit behaviour.', ['energy', 'vec']),
      t('mag', 'Magnetism and electromagnetic induction', 'Analyse forces on charges and induced EMF.', ['elec']),
      t('optics', 'Optics and modern physics', 'Handle ray and wave optics, photoelectric effect and atomic models.', ['mag']),
    ] },
    { key: 'chem', title: 'Chemistry', summary: 'Physical, organic and inorganic.', topics: [
      t('mole', 'Mole concept and atomic structure', 'Do stoichiometry and apply quantum numbers and configurations.', [], 1),
      t('bond', 'Periodic table and chemical bonding', 'Explain trends, shapes and bond properties.', ['mole']),
      t('thermo', 'Thermodynamics and equilibrium', 'Use enthalpy, entropy and equilibrium constants quantitatively.', ['mole', 'calc']),
      t('org', 'Organic chemistry: GOC and reactions', 'Predict products using mechanisms and reactive intermediates.', ['bond']),
      t('inorg', 'Inorganic chemistry', 'Recall periodic-block chemistry and coordination compounds.', ['bond']),
    ] },
    { key: 'prac', title: 'Practice and testing', summary: 'Exam-level problem solving.', topics: [
      t('pyq', 'Chapter-wise previous-year questions', 'Practise topic-wise papers and review weak chapters.', ['optics', 'org', 'inorg', 'permprob']),
      t('mocks', 'JEE Main and Advanced mock tests', 'Simulate exam conditions and refine your attempt strategy.', ['pyq']),
    ] },
  ],
}

const cat = {
  id: 'cat',
  label: 'CAT preparation',
  milestones: [
    { key: 'quant', title: 'Quantitative aptitude', summary: 'Fast, accurate arithmetic and algebra.', topics: [
      t('arith', 'Arithmetic: percentages, ratios, time and work', 'Solve everyday arithmetic problems quickly with shortcuts.', [], 1),
      t('nums', 'Number systems', 'Use divisibility, remainders and factors in problem solving.', [], 1),
      t('alg', 'Algebra and equations', 'Handle linear, quadratic and inequality problems.', ['arith']),
      t('geo', 'Geometry and mensuration', 'Apply triangles, circles and solids to area and volume questions.', ['alg']),
      t('modern', 'Permutations, probability and modern maths', 'Count and compute probabilities under constraints.', ['alg', 'nums']),
    ] },
    { key: 'varc', title: 'Verbal ability and reading', summary: 'Comprehension and language.', topics: [
      t('rc', 'Reading comprehension strategy', 'Extract main idea, tone and inference from dense passages.'),
      t('va', 'Para-jumbles and summaries', 'Order sentences and summarise arguments precisely.', ['rc']),
    ] },
    { key: 'dilr', title: 'Data interpretation and logic', summary: 'Select and solve the right sets.', topics: [
      t('di', 'Data interpretation: tables and charts', 'Read and compare charts, tables and mixed data.', ['arith']),
      t('lr', 'Logical reasoning: arrangements and grids', 'Solve seating, scheduling and grid puzzles systematically.'),
      t('dilr', 'DILR set selection', 'Pick solvable sets quickly and manage time within the section.', ['di', 'lr']),
    ] },
    { key: 'test', title: 'Test readiness', summary: 'Turn skills into percentile.', topics: [
      t('sect', 'Sectional tests and error log', 'Practise each section under time limits and track recurring errors.', ['modern', 'geo', 'va', 'dilr']),
      t('mock', 'Full mocks and analysis', 'Take timed mocks and tune your section order and attempt strategy.', ['sect']),
      t('wat', 'Interview and written-ability prep', 'Prepare structured answers for the WAT and personal interview stage.', ['mock']),
    ] },
  ],
}

const engineering = {
  id: 'engineering',
  label: 'Engineering subject study',
  note: 'This is a general engineering study structure. Rename topics to match your specific subject and syllabus.',
  milestones: [
    { key: 'found', title: 'Foundations', summary: 'The maths and physics you will lean on.', topics: [
      t('emath', 'Engineering mathematics toolkit', 'Refresh calculus, linear algebra and differential equations as used in this subject.', [], 1),
      t('phys', 'Physical principles and units', 'Use conservation laws, dimensional analysis and consistent units.', [], 1),
      t('model', 'Problem modelling and assumptions', 'Turn a real situation into a clean, solvable model.', ['emath', 'phys']),
    ] },
    { key: 'theory', title: 'Core theory', summary: 'The laws and how they combine.', topics: [
      t('laws', 'Fundamental laws and governing equations', 'State and derive the governing equations of the subject.', ['model']),
      t('systems', 'System analysis and diagrams', 'Draw and analyse block, free-body or circuit-style diagrams.', ['laws']),
      t('behaviour', 'Component and material behaviour', 'Explain how components respond under load, signal or heat.', ['laws']),
    ] },
    { key: 'solve', title: 'Problem solving', summary: 'Work numbers and derivations.', topics: [
      t('numerical', 'Numerical problem solving', 'Solve multi-step numerical problems with correct units and checks.', ['systems']),
      t('derive', 'Derivations and proofs', 'Reproduce key derivations and know their assumptions.', ['laws']),
      t('tools', 'Computational and simulation tools', 'Use a tool such as MATLAB or Python to validate hand calculations.', ['numerical']),
    ] },
    { key: 'apply', title: 'Applications and exams', summary: 'Use it for real designs and tests.', topics: [
      t('cases', 'Case studies and design applications', 'Apply theory to a realistic design or analysis scenario.', ['numerical', 'behaviour']),
      t('lab', 'Lab and measurement practice', 'Plan an experiment and interpret measurement error.', ['tools']),
      t('exam', 'Exam and project readiness', 'Consolidate with past papers and a short project report.', ['cases', 'lab', 'derive']),
    ] },
  ],
}

const medical = {
  id: 'medical',
  label: 'Medical subjects',
  note: 'A general medical-sciences structure for study planning only. It is not clinical advice.',
  milestones: [
    { key: 'basic', title: 'Basic sciences', summary: 'The structure and chemistry of the body.', topics: [
      t('anat', 'General anatomy', 'Name and locate major structures and their relationships.', [], 1),
      t('physio', 'General physiology', 'Explain how cells, tissues and homeostasis work.', [], 1),
      t('biochem', 'Biochemistry and molecular biology', 'Link metabolism and molecular pathways to function.', [], 1),
      t('histo', 'Histology and embryology', 'Recognise tissue types and trace development.', ['anat']),
    ] },
    { key: 'systems', title: 'Organ-system physiology', summary: 'How the systems work and interact.', topics: [
      t('cardio', 'Cardiovascular and respiratory systems', 'Describe cardiac cycle, circulation and gas exchange.', ['anat', 'physio']),
      t('renalgi', 'Renal, gastrointestinal and endocrine systems', 'Explain fluid balance, digestion and hormonal control.', ['physio', 'biochem']),
      t('neuro', 'Nervous system', 'Trace pathways and explain neural control of function.', ['anat', 'physio']),
    ] },
    { key: 'path', title: 'Pathology and pharmacology', summary: 'What goes wrong and how it is treated.', topics: [
      t('patho', 'General pathology', 'Explain inflammation, injury, neoplasia and repair.', ['histo']),
      t('micro', 'Microbiology and immunology', 'Describe pathogens and the immune response.', ['biochem']),
      t('pharma', 'Pharmacology principles', 'Understand pharmacokinetics, pharmacodynamics and drug classes.', ['biochem', 'physio']),
    ] },
    { key: 'clinical', title: 'Clinical application and revision', summary: 'Bring it together for exams and wards.', topics: [
      t('clinical', 'Clinical reasoning and case-based study', 'Work from symptoms and findings to likely mechanisms.', ['patho', 'pharma', 'neuro', 'cardio', 'renalgi']),
      t('mcq', 'MCQ bank practice', 'Practise exam-style questions and review explanations.', ['clinical', 'micro']),
      t('revise', 'Spaced revision cycles', 'Schedule repeated review of weak areas before the exam.', ['mcq']),
    ] },
  ],
}

const design = {
  id: 'design',
  label: 'Graphic design and UI/UX',
  milestones: [
    { key: 'found', title: 'Design foundations', summary: 'The visual language of good design.', topics: [
      t('principles', 'Visual design principles', 'Apply contrast, balance, alignment and repetition.', [], 0),
      t('color', 'Colour theory', 'Build palettes with purpose and check contrast.', ['principles'], 0),
      t('type', 'Typography', 'Pair typefaces and set readable type hierarchies.', ['principles'], 1),
      t('layout', 'Layout, grids and hierarchy', 'Organise content on a grid so the eye knows where to go.', ['principles'], 1),
    ] },
    { key: 'tools', title: 'Tools and systems', summary: 'Work efficiently in a design tool.', topics: [
      t('figma', 'Figma and vector tool basics', 'Draw, align and organise layers with auto-layout and frames.', ['layout']),
      t('components', 'Components and design systems', 'Build reusable components with variants and tokens.', ['figma', 'color', 'type']),
    ] },
    { key: 'ux', title: 'UX process', summary: 'Design for real people.', topics: [
      t('research', 'User research and personas', 'Plan interviews and turn findings into personas and needs.'),
      t('flows', 'Information architecture and user flows', 'Map the structure and key journeys of a product.', ['research']),
      t('wire', 'Wireframing', 'Sketch low-fidelity screens that solve the main flows.', ['flows', 'layout']),
    ] },
    { key: 'practice', title: 'Practice and portfolio', summary: 'Prove your skills.', topics: [
      t('proto', 'Prototyping and usability testing', 'Build a clickable prototype and test it with users.', ['wire', 'components']),
      t('portfolio', 'Case study and portfolio', 'Write up a project that shows your process and outcomes.', ['proto']),
    ] },
  ],
}

// Generic starter template. Wording is filled in from the learner's own goal text.
export function buildGeneric(goal) {
  const g = goal.trim().replace(/\s+/g, ' ')
  const short = g.length > 38 ? `${g.slice(0, 36).trim()}...` : g
  return {
    id: 'generic',
    label: 'Generic starter roadmap',
    note: 'No specific template matches this goal, so this is a general learn-by-stages structure. Replace the topic names with specifics as you learn more.',
    milestones: [
      { key: 'orient', title: 'Orientation', summary: 'Know the field before you dive in.', topics: [
        t('scope', `Map the field: ${short}`, `Describe what "${g}" covers, who uses it and what success looks like.`, [], 0),
        t('terms', 'Core vocabulary and concepts', `Define the key terms you will meet while learning ${short}.`, ['scope'], 0),
        t('setup', 'Tools and learning resources', 'Choose the tools, books or courses you will use and set up your workspace.', ['scope'], 1),
      ] },
      { key: 'core', title: 'Core skills', summary: 'Learn the essentials properly.', topics: [
        t('principles', 'Fundamental principles', `Explain the basic principles that everything else in ${short} builds on.`, ['terms']),
        t('techniques', 'Core techniques', 'Perform the most common techniques step by step.', ['principles', 'setup']),
        t('examples', 'Worked examples', 'Study solved examples and reproduce them without help.', ['techniques']),
      ] },
      { key: 'practice', title: 'Applied practice', summary: 'Practise until it sticks.', topics: [
        t('guided', 'Guided practice', 'Complete structured exercises and check your own work.', ['examples']),
        t('mistakes', 'Common mistakes and review', 'List frequent errors and fix your weak spots.', ['guided']),
        t('mini', 'Mini project', `Apply what you know to one small, real piece of ${short}.`, ['guided']),
      ] },
      { key: 'mastery', title: 'Mastery', summary: 'Stretch and demonstrate your skill.', topics: [
        t('advanced', 'Advanced topics', 'Pick two harder topics and learn them in depth.', ['mistakes']),
        t('final', 'Final project or assessment', `Show your ability with a capstone that proves you can ${short.toLowerCase()}.`, ['mini', 'advanced']),
      ] },
    ],
  }
}

const BY_CATEGORY = {
  'Programming / Full-stack': fullstack,
  GATE: gate,
  JEE: jee,
  CAT: cat,
  'Engineering subject': engineering,
  'Medical subject': medical,
  'Graphic design / UI-UX': design,
}

export const TEMPLATES = [fullstack, gate, jee, cat, engineering, medical, design]

// Picks a template from the chosen category. "Other skill" gets light keyword routing
// on the goal text, otherwise the generic starter roadmap.
export function templateForCategory(category, goal) {
  if (BY_CATEGORY[category]) return BY_CATEGORY[category]
  if (/full.?stack|web dev|react|javascript|frontend|backend/i.test(goal)) return fullstack
  if (/\bui\b|\bux\b|graphic|figma|design/i.test(goal)) return design
  return buildGeneric(goal)
}

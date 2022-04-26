
/* QUESTION */
// You are given a list of projects and a list of dependencies (which is a list of pairs of projects, where the second project is dependent on the first project). 
// All of a project's dependencies must be built before the project is. Find a build order that will allow the projects to be built. If there is no valid build order, return an error.

/* EXAMPLE */
// projects: a, b, c, d, e, f
// dependencies: (a, d), (f, b), (b, d), (f, a), (d, c)
// output: f, e, a, b, d, c 

/* SOLUTION */
// Hold a hash map for checking, set for resolved
// Check for loops by comparing against the "checking"
// Follow the build order until we can resolve one, then backtrack and resolve all of them (return up the stack)
// Return false if we're checking one that already exists in the "checking" hash map, because that means we have a loop

// For each in projects
// RECURSIVE START
//   Is this project already being checked? If not, 
//   If so, we have a loop and we should return false. No valid path
//   Does this project exist in resolved set? If so, add it to output and continue
//   else, can the project that this depends on be resolved?
//   if project returns true, then add this project to resolved set and return back up the stack.

// edge cases: empty projects
// no valid path
// infinite loop

/* TEST CASE */
// projects: a, b, c, d, e, f
// dependencies: (d, a), (b, f), (d, b), (a, f), (c, d)
// expected output: f, e, a, b, d, c 

// checking: 
// output: [f, a, b, d, c, e]
// checking: []
// resolved: [f, a, b, d, c, e]

const buildOrder = (projects, dependencies) => {
    let output = [];
    let checking = new Set();
    let resolved = new Set(); // redundant if we just check output. But that does not have o(1) search

    // turn dependencies into hash map (key, value) = (project, dependency)
    let dependenciesMap = createHashMap(dependencies);

    for (let i = 0; i < projects.length; i++) {
        let result = resolveOrderChain(projects, dependenciesMap, projects[i], checking, resolved, output);
        if(!result) {
            return false;
        }
    }
    // if we have not returned false yet, the path will be complete
    return output;
};

const resolveOrderChain = (projects, dependencies, project, checking, resolved, output) => {
    // is this already resolved?
    if (resolved.has(project)) {
        // no need to push to output if it already resolved. It will already be there.
        return;
    }
    if (!dependencies.has(project)) {
        output.push(project);
        resolved.add(project);
        return;
    }
    // has this project's dependency been resolved?
    if (resolved.has(dependencies.get(project))) {
        output.push(project);
        resolved.add(project);
        return;
    }

    // are we already checking this project for dependencies?
    if (checking.has(project)) {
        // if we are, return false. There is a loop so there is no solution
        return false;
    }
    // add project to checking
    checking.add(project);
    
    // check the project this project is dependent on
    let result = resolveOrderChain(projects, dependencies, dependencies.get(project), checking, resolved, output);
    if (!result) {
        return false;
    }

    // path resolved. Add self to resolved.
    output.push(project);
    // add to resolved. TODO: This might be unecessary. Could we just check the last item in output's array?
    resolved.add(project);

    // remove from checking
    checking.delete(project);

    return;
};

const createHashMap = (dependencies) => {
    let map = new Map();
    for (let i = 0; i < Math.min(keys.length, values.length); i++) {
        map.set(dependencies[i][1], dependencies[i][0]);
    }
    return map;
}


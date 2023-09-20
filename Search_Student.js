///\/\/\\\/\/\//\\///\//\\\///////\/\/\\\/\/\//\\///\//\\\//////
//
//  Assignment       COMP3200 - Assignment 1
//  Professor:       David Churchill
//  Year / Term:     2023-09
//  File Name:       Search_Student.js
// 
//  Student Name:    Arnob Ghosh
//  Student User:    arnobg
//  Student Email:   arnobg@mun.ca
//  Student ID:      202136073
//  Group Member(s): [enter student name(s)]
//
///\/\/\\\/\/\//\\///\//\\\///////\/\/\\\/\/\//\\///\//\\\//////

// All of your Assignment 1 code should be in this file, it is the only file submitted
// You may create additional functions / member variables within this class, but do not
// rename any of the existing class variables or function names, since they are used by 
// the // GUI to perform specific functions.
//
// Your group only submits ONE file total, not one file per person
// So make sure both names are entered above
class Search_Student {
       
    constructor(grid, config) {
        
        this.config = config;       // search configuration object
                                    //   config.actions = array of legal [x, y] actions
                                    //   config.actionCosts[i] = cost of config.actions[i]
                                    //   config.strategy = 'bfs' or 'dfs'

        this.grid = grid;           // the grid we are using to search
        this.sx = -1;               // x location of the start state
        this.sy = -1;               // y location of the start state
        this.gx = -1;               // x location of the goal state
        this.gy = -1;               // y location of the goal state
        this.cost = 0;

        this.inProgress = false;     // whether the search is in progress
        this.name = 'Student';

        this.path = [];             // the path, if the search found one
        this.open = [];             // the current open list of the search (stores Nodes)
        this.closed = [];           // the current closed list of the search
    }
    
    // Student TODO: Implement this function
    //
    // This function should set up all the necessary data structures to begin a new search
    // This includes, but is not limited to: setting the start and goal locations, resetting
    // the open and closed lists, and resetting the path. I have provided a starting point,
    // but it is not complete.
    //
    // Args:
    //    sx, sy (int,int) : (x,y) position of the start state
    //    gx, gy (int,int) : (x,y) position of the goal state
    //
    // Returns:
    //    none             : this function does not return anything
    //
    startSearch(sx, sy, gx, gy) {
        this.inProgress = true;     // the search is now considered started
        this.sx = sx;               // set the x,y location of the start state
        this.sy = sy;
        this.gx = gx;               // set the x,y location of the goal state
        this.gy = gy;
        this.path = [];             // set an empty path
       
        // TODO: everything else necessary to start a new search
        // reset open and closed lists
        this.open = [];
        let rootNode = new Node(sx, sy, null, null);
        this.open.push(rootNode);
        //console.log(this.open.length);
        this.closed = [];
        // create root node and add it to the open list
    }

    // Student TODO: Implement this function
    //
    // This function should compute and return whether or not the given action is able
    // to be performed from the given (x,y) location
    //
    // Args:
    //    x, y   (int,int) : (x,y) location of the given position
    //    action [int,int] : the action to be performed, representing the [x,y] movement
    //                       from this position. for example: [1,0] is move 1 in the x
    //                       direction and 0 in the y direction (move right). For this
    //                       assignment, the only action possibilities should be:
    //                       [1,0], [0,1], [-1,0], [0,-1] 
    //
    // Returns:
    //    bool : whether or not the given action is legal at the given location
    isLegalAction(x, y, action) {

        let nx = x + action[0];
        let ny = y + action[1];

        // 1. create nx, ny (new location after action perform)
        // 2. if this.grid.isOOB(nx,ny) then return false
        // 3. if this.grid.get(x,y) not same as this.grid.get(nx,ny) return false

        if(this.grid.isOOB(nx, ny, 1)){
            //console.log("oob");
            return false; 
        }
        if(this.grid.get(x, y) != this.grid.get(nx, ny)){
            //console.log("color issue");
            return false;
        }
        return true;
    }

    // Student TODO: Implement this function
    //
    // This function performs one iteration of search, which is equivalent to everything
    // inside the while (true) part of the algorithm pseudocode in the class nodes. The
    // only difference being that when a path is found, we set the internal path variable
    // rather than return it from the function. When expanding the current node, you must 
    // use the this.isLegalAction function above.
    //
    // If the search has been completed (path found, or open list empty) then this function
    // should do nothing until the startSearch function has been called again. This function
    // should correctly set the this.inProgress variable to false once the search has been
    // completed, which is required for the GUI to function correctly.
    //
    // This function should perform one iteration of breadth-first search (BFS) if the
    // this.config.strategy variable == 'bfs', or one iteration of depth-first search (DFS) if
    // the this.config.strategy variable == 'dfs'. There should be a few line(s) of code difference
    // between the two algorithms.
    //
    // Tip: You can use a JavaScript array to represent a queue or a stack. 
    //      Array.push(e) pushes an element onto the end of the array. 
    //      You can use Array.pop() to return and remove the last element of the array, simulating a stack. 
    //      You can use Array.shift() to return and remove the first element of the array, simulating a queue
    //      You may also use your own custom data structure(s) if you wish.
    //
    // Args:
    //    none
    //
    // Returns:
    //    none
    //
    searchIteration() {
        // Example: For simple demonstration, compute an L-shaped path to the goal
        // This is just so the GUI shows something when Student code is initially selected
        // Completely delete all of the code in this function to write your solution
        // if we've already finished the search, do nothing
        if (!this.inProgress) { return; }
       
        if(this.open.length ==0){
            //console.log("MT");
            this.inProgress = false;
            this.cost = -1;
            return;
        }
        let node = null;
        // check to see which algorithm you should be implementing
        if(this.config.strategy == 'bfs'){
            // do breadth-first-search
            node = this.open.shift();
            //console.log("bfs", node);
        }
        else if(this.config.strategy == 'dfs'){
            // do depth-first-search
            node = this.open.pop()
        }
        
        if(node.x == this.gx && node.y == this.gy){
            let nextNode = node;
            while(nextNode.parent != null){
                this.path.push(nextNode.action);
                nextNode = nextNode.parent;
            }
            // reverse this path
            this.path.reverse();
            this.inProgress = false;
            this.cost = this.path.length * 100;
            console.log(this.getClosed());
            return;
        }

  
        //if(node.state in closed) continue
        for(let i=0; i<this.closed.length; i++){
            if(node.x == this.closed[i][0] && node.y == this.closed[i][1]){
                return;
            }
            
        }

        this.closed.push([node.x, node.y]);
        
        //open.add(Expand(node, problem)) 
        for(let a=0; a<this.config.actions.length; a++){
            let action = this.config.actions[a];
            if(!this.isLegalAction(node.x, node.y, action)){continue;}

            // generate the nx, ny, next state
            // generate the new node(nx, ny, action, parent)
            let childnode = new Node(node.x+action[0], node.y+action[1], action, node);
            // add that new node to the open list
            this.open.push(childnode)
        }
        //console.log(this.open);

        // note: do not duplicate all of your BFS / DFS code in the if-statement above
        //       you should only include what is different between the two algorithms
       
        // the cost of the path for this assignment is the path length * 100
        // since all action costs are equal to 100 (4-directional movement)
        // this.cost = this.path.length * 100;
        // we found a path, so set inProgress to false
    }

    // Student TODO: Implement this function
    //
    // This function returns the current open list states in a given format. This exists as
    // a separate function because your open list used in search will store nodes
    // instead of states, and may have a custom data structure that is not an array.
    //
    // Args:
    //    none
    //
    // Returns:
    //    openList : an array of unique [x, y] states that are currently on the open list
    //
    getOpen() {
        let openStates = [];
        for(let a=0; a<this.open.length; a++){
            openStates.push([this.open[a].x, this.open[a].y]);
        }
        return openStates;
    }

    // Student TODO: Implement this function
    //
    // This function returns the current closed list in a given format. This exists as
    // a separate function, since your closed list used in search may have a custom 
    // data structure that is not an array.
    //
    // Args:
    //    none
    //
    // Returns:
    //    closedList : an array of unique [x, y] states that are currently on the closed list
    //
    getClosed() {
        return this.closed;
    }
}

// The Node class to be used in your search algorithm.
// This should not need to be modified to complete the assignment
class Node {
    constructor(x, y, action, parent) {
        this.x = x;
        this.y = y;
        this.action = action;
        this.parent = parent;
    }
}

// Copyright (C) David Churchill - All Rights Reserved
// COMP3200 - 2023-09 - Assignment 1
// Written by David Churchill (dave.churchill@gmail.com)
// Unauthorized copying of these files are strictly prohibited
// Distributed only for course work at Memorial University
// If you see this file online please contact email above

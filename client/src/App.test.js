import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from "react-dom/test-utils";
import { Board } from './App';

let container;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});
afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe("Board component", () => {
  test("Drawing the board fitting the Sudoku rule.", async () => {
  	let line = [], t = [];
  	const oneLine = [1,2,3,4,5,6,7,8,9];
  	const fakeResponse = [3,8,2,7,5,0,1,6,4,1,0,4,2,6,3,5,8,7,7,6,5,1,8,4,2,0,3,5,2,3,8,4,1,0,7,6,8,7,6,0,2,5,3,4,1,0,4,1,6,3,7,8,5,2,6,3,7,5,0,2,4,1,8,2,5,8,4,1,6,7,3,0,4,1,0,3,7,8,6,2,5];
    
	jest.spyOn(window, "fetch").mockImplementation(() => {
		const fetchResponse = {
	    	json: () => Promise.resolve(fakeResponse)
		};
		return Promise.resolve(fetchResponse);
	});

    await act(async () => {
      render(<Board />, container);
    });

    for (var i = 0; i < 81; i++)
    	t.push(container.querySelector('#id' + i).textContent);

    // Test horizontal rule
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            line.push(t[j + (i * 9)]);
        }
        expect(line.sort().join() == oneLine).toBeTruthy(); // Horizontal rule
        line = [];
    }

    // Test vertical rule
	for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            line.push(t[i + (j * 9)]);
        }
        expect(line.sort().join() == oneLine).toBeTruthy(); // Vertical rule
        line = [];
    }

    window.fetch.mockRestore();
  });
});
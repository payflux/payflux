import { SideBar } from "./components/SideBar";
import { CodeEditor } from "./components/CodeEditor";
import { Grid, useTheme } from "@mui/material";

const snippetsMonkeyPatch = [
  {
    value: `//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.16;

import {console} from 'hardhat/console.sol';
import {IGreeter} from '../interfaces/IGreeter.sol';

/// @title A contract for boilerplating
/// @author Hardhat (and DeFi Wonderland)
/// @notice You can use this contract for only the most basic tests
/// @dev This is just a try out
/// @custom:experimental This is an experimental contract.`,
  },
  {
    value: `contract Greeter is IGreeter {
      string public override greeting;
    
      constructor(string memory _greeting) {
        console.log('Deploying a Greeter with greeting:', _greeting);
        greeting = _greeting;
      }
      function greet() external view override returns (string memory _greet) {
        return greeting;
      }`,
  },
  {
    value: `  /// @notice Sets greeting that will be used during greet
    /// @dev Some explanation only defined for devs
    /// @param _greeting The greeting to be used
    /// @return _changedGreet Was greeting changed or nah
    function setGreeting(string memory _greeting) external override returns (bool _changedGreet) {
      if (bytes(_greeting).length == 0) revert EmptyGreeting();
      console.log('Changing greeting from', greeting, 'to', _greeting);
      greeting = _greeting;
      _changedGreet = true;
      emit GreetingSet(_greeting);
    }
  }`,
  },
];

function App() {
  const theme = useTheme();

  return (
    <>
      <Grid
        container
        spacing={2}
        height="100vh"
        marginTop={0}
        alignItems="center"
      >
        <Grid pb={"16px"} item xs={2}>
          <SideBar />
        </Grid>
        <Grid item xs={5}></Grid>
        <Grid
          item
          xs={5}
          p={theme.custom.padding.large}
          borderRadius={`${theme.custom.borderRadius.default} 0 0 ${theme.custom.borderRadius.default}`}
          bgcolor={theme.palette.background.sidebar}
        >
          <CodeEditor highlightedIndex={1} snippets={snippetsMonkeyPatch} />
        </Grid>
      </Grid>
    </>
  );
}

export default App;

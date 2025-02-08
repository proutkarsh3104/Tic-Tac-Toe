
# Tic-Tac-Toe Game

This project is a Python-based Tic-Tac-Toe game built with Pygame. It provides a simple, fun way to experience classic gameplay with options for both single-player and two-player modes. The game offers basic AI to play against in single-player mode and is structured for easy customization or further development.

## Table of Contents
- [Features](#features)
- [Game Modes](#game-modes)
- [Installation](#installation)
- [Usage](#usage)
- [How to Play](#how-to-play)
- [Project Structure](#project-structure)
- [AI Logic](#ai-logic)
- [Contributing](#contributing)
- [License](#license)

## Features
- **Single Player**: Play against an AI with basic decision-making.
- **Two Players**: Play with a friend on the same computer.
- **Simple UI**: A clean, interactive user interface built with Pygame for easy gameplay.
- **Replay Option**: Option to replay after each game.
- **Cross-platform Support**: Works on Windows, macOS, and Linux with Pygame.

## Game Modes
1. **Single-Player Mode**:
   - In this mode, you play against the computer's AI.
   - The AI makes moves to block the player and attempts to win, but uses basic logic rather than advanced strategies, making it accessible and enjoyable for casual players.

2. **Two-Player Mode**:
   - Play against a friend, taking turns on the same computer.
   - A great way to enjoy Tic-Tac-Toe in a classic face-to-face setting.

## Installation
To get started, ensure Python and Pygame are installed on your system.

### Step 1: Clone the repository
Clone this repository to your local machine:
```bash
git clone https://github.com/proutkarsh3104/Tic-Tac-Toe.git
cd Tic-Tac-Toe
```

### Step 2: Install dependencies
Install Pygame using pip:
```bash
pip install pygame
```

### Step 3: Run the game
Run the game with the following command:
```bash
python main.py
```

## Usage
- **Run the game**: After installation, use `python main.py` to start the game.
- **Choose a mode**: The game will prompt you to select either single-player or two-player mode.
- **Exit**: Close the game window or follow in-game prompts to exit.

## How to Play
- **Objective**: The objective is to align three of your marks (either "X" or "O") in a row, column, or diagonal on a 3x3 grid.
- **Gameplay**:
  - In two-player mode, players alternate turns.
  - In single-player mode, the player goes first, then the AI takes its turn.
- **Winning and Draws**:
  - A player wins by completing a row, column, or diagonal with their marks.
  - If the grid is completely filled with no winner, the game is a draw.

## Project Structure
- `main.py`: The main script that initializes the game, handles user input, and manages the game loop.
- `assets/`: (Optional) A folder for any images, sound files, or other assets used in the game.
- `README.md`: This documentation file.
- `LICENSE`: License information for the project.

## AI Logic
The AI in this game uses basic decision-making logic to determine its moves. It follows these steps:
1. **Win Checking**: If there’s an immediate winning move available, the AI takes it.
2. **Blocking**: If the player is about to win in the next move, the AI will block them.
3. **Random Move**: If no immediate win or block is required, the AI picks an available spot randomly.

This makes the game AI relatively simple and beginner-friendly, without being overly predictable.

## Contributing
We welcome contributions to enhance the game. Here’s how you can contribute:
1. **Fork the repository**: Create a fork of this repository on your GitHub account.
2. **Create a new branch**: Use `git checkout -b feature-name` to create a new branch for your feature or fix.
3. **Make changes**: Write your code, test it, and make sure it’s working as expected.
4. **Commit and push**: Commit your changes and push to your branch.
5. **Submit a pull request**: Submit a pull request with a description of your changes.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

This Tic-Tac-Toe project is a beginner-friendly way to learn Python, game logic, and AI basics, and offers a foundation for those interested in exploring more complex game development or AI strategies.
```

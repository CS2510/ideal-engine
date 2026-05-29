# Ideal Engine

A modular, component-based game engine written in TypeScript for educational purposes in CS2510 (Game Engine Architecture).

## Overview

The Ideal Engine is a lightweight 2D game engine featuring:
- **Component-based architecture** for flexible game object composition
- **Scene management** with support for multiple scenes and additive loading
- **Collision detection** with trigger and physical collision support
- **Input handling** for keyboard and mouse events
- **Transform hierarchy** with parent-child relationships
- **Behavior trees** for AI decision-making
- **Camera system** with viewport management

## Recent Updates

The codebase has been modernized with:
- **ES6 Modules**: Converted from global script tags to proper module imports
- **TypeScript**: Full type-safe implementation with strict type checking
- **Modern Bundling**: Support for modern build tooling via `tsconfig.json`

## Project Structure

```
engine/               # Core engine implementation
├── Engine.ts        # Main engine loop and initialization
├── Scene.ts         # Scene lifecycle and management
├── GameObject.ts    # Base class for all game objects
├── Component.ts     # Base class for components
├── Vector2.ts       # 2D vector math utilities
├── Transform.ts     # Position, rotation, scale, parent-child relationships
├── Input.ts         # Keyboard and mouse input handling
├── Time.ts          # Frame timing and deltaTime management
├── Events.ts        # Event system for messaging
├── SceneManager.ts  # Scene management and switching
├── Collisions.ts    # Collision detection and resolution
├── Mathf.ts         # Math utility functions
├── BehaviorTree.ts  # Behavior tree primitives
└── components/
    ├── Camera.ts    # Camera component with viewport clipping
    ├── Collider.ts  # Collision detection component
    ├── RigidBody.ts # Physics simulation component
    ├── Polygon.ts   # Polygon rendering component
    └── TextLabel.ts # Text rendering component

games/
├── main-game/       # Shooter game implementation
│   ├── index.html   # Game launcher
│   └── *.ts         # Game-specific components and scenes
├── platformer-game/ # Platformer game implementation
│   ├── index.html   # Game launcher
│   └── *.ts         # Game-specific components and scenes
├── cards.html       # Card game demo
├── merge.html       # 2048-like merge demo
└── top-down.html    # Top-down movement demo

tests/               # Test and demo pages
├── collision-*.html # Collision detection tests
├── event.html       # Event system tests
├── input-*.html     # Input handling tests
├── camera.html      # Camera system tests
└── game-object-*.html # GameObject and hierarchy tests

all.html             # Dashboard linking all demos and tests
```

## Getting Started

### Prerequisites
- Node.js 14+ (for TypeScript compilation if needed)
- Modern web browser with ES6 module support

### Installation

```bash
npm install
```

### Running the Engine

Open any of the HTML demo files directly in a browser:

**Full Games:**
- `games/main-game/index.html` - Shooter game with behavior trees
- `games/platformer-game/index.html` - Platformer with physics

**Demo Pages:**
- `games/cards.html` - Card game mechanics
- `games/merge.html` - 2048-style merging
- `games/top-down.html` - Top-down movement

**Test Suite:**
- `all.html` - Dashboard with links to all tests
- `tests/collision-*.html` - Collision testing
- `tests/event.html` - Event system
- `tests/input-*.html` - Input handling
- `tests/camera.html` - Camera functionality
- `tests/game-object-*.html` - GameObject hierarchy

## Core Concepts

### Components
Game objects are composed of components that encapsulate behavior:

```typescript
const player = new GameObject("Player");
player.addComponent(new Transform());
player.addComponent(new Collider());
player.addComponent(new RigidBody());
player.addComponent(new SpriteComponent());
```

### Scenes
Scenes contain game objects and manage their lifecycle:

```typescript
class MainScene extends Scene {
  start() {
    const player = new GameObject("Player");
    this.instantiate(player, new Vector2(0, 0));
  }
}

SceneManager.currentScene = new MainScene();
```

### Events
Objects can communicate via the event system:

```typescript
player.sendMessage("takeDamage", { amount: 10 });
```

### Transform Hierarchy
GameObjects can have parent-child relationships:

```typescript
player.transform.parent = container.transform;
```

## Development

The engine is built with TypeScript. Configuration is managed via `tsconfig.json`:

- **Source**: TypeScript files (`.ts`)
- **Output**: JavaScript with modern ES2020 target
- **Module System**: ES6 modules

To add new components or systems, extend the `Component` base class and implement required lifecycle methods:

```typescript
export class MyComponent extends Component {
  start() {
    // Called when the component is first enabled
  }

  update() {
    // Called every frame
  }

  draw() {
    // Called during the render phase
  }
}
```

## License

This project is part of CS2510 coursework. See [AcademicIntegrity.md](AcademicIntegrity.md) for policies.

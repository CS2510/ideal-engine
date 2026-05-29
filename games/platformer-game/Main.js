// Please carefully review the rules about academic integrity found in the academicIntegrity.md file found at the root of this project.
// Entry point for the platformer game
import { SceneManager } from "../../engine/SceneManager.js";
import { Engine } from "../../engine/Engine.js";
import { PlatformMainScene } from "./PlatformMainScene.js";
SceneManager.currentScene = new PlatformMainScene();
Engine.start();

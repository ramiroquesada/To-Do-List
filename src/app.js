import "./reset.css";
import "./styles.css";

import todos from "./tareas"


let todo1 = new todos("HOLA", "DESCRIPTION1", "1/1/2024", "normal");



todo1.setTitle("1")

console.log(todo1.getTitle())
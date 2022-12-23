#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
use pyo3::{prelude::*, types::PyModule};

fn pygreet(name: &str) -> PyResult<String> {
    let py_foo = include_str!(concat!(
        env!("CARGO_MANIFEST_DIR"),
        "/python_app/utils/foo.py"
    ));
    let py_app = include_str!(concat!(env!("CARGO_MANIFEST_DIR"), "/python_app/main.py"));
    Python::with_gil(|py| {
        let module = PyModule::from_code(py, py_app, "", "")?;
        let result = module.getattr("greet")?.call1((name,))?;
        let value = result.extract()?;
        Ok(value)
    })
}

fn pychart() -> PyResult<String> {
    let py_foo = include_str!(concat!(
        env!("CARGO_MANIFEST_DIR"),
        "/python_app/utils/foo.py"
    ));
    let py_app = include_str!(concat!(env!("CARGO_MANIFEST_DIR"), "/python_app/main.py"));
    Python::with_gil(|py| {
        let module = PyModule::from_code(py, py_app, "", "")?;
        let result = module.getattr("chart")?.call0()?;
        let value = result.extract()?;
        Ok(value)
    })
}

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    let val = pygreet(name).expect("error");
    val
}

#[tauri::command]
fn chart() -> String {
    let val = pychart().expect("error");
    val
}

fn main() {
    pyo3::prepare_freethreaded_python();
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, chart])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

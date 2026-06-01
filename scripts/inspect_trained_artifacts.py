from pathlib import Path
import pickle
import joblib

ARTIFACT_DIR = Path("models/trained")

FILES = {
    "model": ARTIFACT_DIR / "best_model.pkl",
    "scaler": ARTIFACT_DIR / "scaler.pkl",
    "feature_names": ARTIFACT_DIR / "feature_names.pkl",
    "encoders": ARTIFACT_DIR / "encoders.pkl",
}

def load_file(path: Path):
    try:
        return joblib.load(path)
    except Exception:
        with open(path, "rb") as file:
            return pickle.load(file)

def main():
    print("=== Inspect Trained Artifacts ===")

    for name, path in FILES.items():
        print(f"\n{name}: {path}")

        if not path.exists():
            print("  [ERROR] File tidak ditemukan")
            continue

        obj = load_file(path)
        print(f"  Type: {type(obj)}")

        if name == "feature_names":
            print(f"  Total features: {len(obj)}")
            print("  Sample features:")
            for feature in list(obj)[:20]:
                print(f"    - {feature}")

        if name == "encoders":
            if isinstance(obj, dict):
                print(f"  Total encoders: {len(obj)}")
                print("  Encoder columns:")
                for key in obj.keys():
                    print(f"    - {key}: {type(obj[key])}")
            else:
                print("  Encoders bukan dict")

if __name__ == "__main__":
    main()

import json
import pandas as pd
from pathlib import Path

OUTPUT_DIR = Path("outputs")
OUTPUT_DIR.mkdir(exist_ok=True)


def get_clean_name(filename: str) -> str:
    return Path(filename).stem.strip().replace(" ", "_")


def export_to_json(filename: str, data: dict) -> str:
    clean_name = get_clean_name(filename)
    json_path = OUTPUT_DIR / f"{clean_name}.json"

    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4)

    return str(json_path)


def export_tables_to_excel(filename: str, tables: list) -> str:
    clean_name = get_clean_name(filename)
    excel_path = OUTPUT_DIR / f"{clean_name}_tables.xlsx"

    valid_tables = []

    for table in tables:
        headers = table.get("headers", [])
        rows = table.get("rows", [])

        if len(headers) < 2:
            continue
        if len(rows) == 0:
            continue

        df = pd.DataFrame(rows)

        if df.empty:
            continue

        valid_tables.append(df)

    if not valid_tables:
        return ""

    with pd.ExcelWriter(excel_path, engine="openpyxl") as writer:
        for i, df in enumerate(valid_tables):
            df.to_excel(writer, sheet_name=f"Table_{i+1}", index=False)

    return str(excel_path)
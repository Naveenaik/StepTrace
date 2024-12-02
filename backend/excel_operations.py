import pandas as pd

# Define the path to the CSV file
file_path = 'new.csv'  # Replace with the actual path to your file

# Load the CSV file
def load_csv():
    try:
        return pd.read_csv(file_path)
    except FileNotFoundError:
        return pd.DataFrame()  # Return an empty DataFrame if the file doesn't exist

# Save the CSV file
def save_csv(df):
    df.to_csv(file_path, index=False)

# Get all data for a specific person
def get_person_data(person_name):
    df = load_csv()
    person_data = df[df['person_name'] == person_name]
    if person_data.empty:
        raise ValueError(f"No data found for person: {person_name}")
    return person_data

# Delete rows for a specific person by indices
def delete_rows(person_name, rows_to_delete):
    df = load_csv()
    person_indices = df[df['person_name'] == person_name].index.tolist()
    invalid_indices = [row for row in rows_to_delete if row not in person_indices]
    if invalid_indices:
        raise ValueError(f"Invalid row indices: {invalid_indices}")
    df = df.drop(rows_to_delete).reset_index(drop=True)
    save_csv(df)

# Ensure uniform rows for all persons
def maintain_uniform_rows(num_rows):
    df = load_csv()
    unique_persons = df['person_name'].unique()
    result = pd.DataFrame()
    for person in unique_persons:
        person_data = df[df['person_name'] == person]
        if len(person_data) > num_rows:
            person_data = person_data.head(num_rows)
        result = pd.concat([result, person_data])
    save_csv(result)
    return result



export const testCollections = [
    {
        id: 1,
        title: "Collection 1",
        description: "Description"
    },
    {
        id: 2,
        title: "Collection 2",
        description: "Description"
    },
   
];

export const testSnippets = [
    {
        id: 1,
        title: "Snippet 1",
        collection_id: 1,
        code: `import random
import string

def generate_password(length):
    characters = string.ascii_letters + string.digits + string.punctuation
    password = ''.join(random.choice(characters) for i in range(length))
    return password

# Generate a random password of length 12
password = generate_password(12)
print(password)
`,
        language: "python",
        description: "Description"
    },
    {
        id: 2,
        title: "Snippet 2",
        collection_id: 1,
        code: `import random
import string

def generate_password(length):
    characters = string.ascii_letters + string.digits + string.punctuation
    password = ''.join(random.choice(characters) for i in range(length))
    return password

# Generate a random password of length 12
password = generate_password(12)
print(password)
`,
        language: "python",
        description: "Description"
    },
    

];


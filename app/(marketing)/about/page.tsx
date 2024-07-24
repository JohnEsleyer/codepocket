

const AboutPage: React.FC = () =>  {

    const AboutCodePocket: string = `
        Welcome to CodePocket, your go-to platform for storing and managing code snippets. 
                We understand the importance of having a reliable place to keep your code snippets 
                organized and easily accessible, whether you're a seasoned developer or just starting out.
    `; 

    const OurMission: string = `
       Our mission is to provide developers with a robust and intuitive tool to store, 
                manage, and share their code snippets. We aim to enhance productivity and 
                collaboration within the developer community by offering a platform that caters 
                to the needs of coders from all backgrounds and expertise levels.
    `;

    const WhyCodePocket: string = `
         CodePocket is designed with simplicity and efficiency in mind. We support a wide 
                range of programming languages, ensuring that you can store and organize your code 
                snippets regardless of the language you're using. As a free and open-source platform, 
                CodePocket encourages community contributions and continuous improvement, making it a 
                tool built by developers for developers.
    `;
    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-4xl font-bold text-center mb-8">About CodePocket</h1>
            <p className="text-lg text-gray-700 mb-6">
                {AboutCodePocket}
            </p>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
            <p className="text-lg text-gray-700 mb-6">
                {OurMission}
            </p>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Why CodePocket?</h2>
            <p className="text-lg text-gray-700 mb-6">
                {WhyCodePocket}
            </p>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Features</h2>
            <ul className="list-disc list-inside text-lg text-gray-700 mb-6">
                <li>Supports multiple programming languages with syntax highlighting</li>
                <li>Free and open-source</li>
                <li>Easy sharing options for collaboration and showcasing</li>
                <li>Intuitive interface for managing your snippets</li>
            </ul>
      
        </div>
    )
}

export default AboutPage;
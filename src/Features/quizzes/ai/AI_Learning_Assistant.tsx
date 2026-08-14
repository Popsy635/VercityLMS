import { useContext, useState, useEffect } from "react";
import AuthContext from "../../../Context/AuthProvider";
import type { AIMessage } from "./types";
import { useSearchParams } from "react-router-dom";
import merry from "../../../assets/merry.png"

type AIMode =
    | "general"
    | "quiz"
    | "recommend"
    | "career"
    | "explain"
    | "summary";

const AIAssistant = () => {

    const [searchParams] = useSearchParams();

    const mode = (searchParams.get("mode") as AIMode) || "general";

    const { auth } = useContext(AuthContext);

    const userName =
        auth?.user?.split("@")[0] || "Learner";

    const formattedName =
        userName.charAt(0).toUpperCase() +
        userName.slice(1);

    const getInitialMessage = (mode: AIMode): AIMessage => {

        const messages: Record<AIMode, string> = {

            general: `Hi ${formattedName}! 👋 I'm Merry, your AI Learning Assistant.

I can help you learn Web Design, Product Design, and Game Development.

You can ask me to:
• Explain a concept
• Quiz you
• Summarize a topic
• Recommend what to learn next
• Give career guidance
• Prepare you for interviews`,

            quiz: `Ready for a challenge, ${formattedName}? 

I can quiz you on:
• Web Design
• Product Design
• Game Development

Which area would you like to be tested on?`,

            recommend: `Let's figure out what you should learn next. 

Tell me which area you're interested in:

• Web Design
• Product Design
• Game Development

I'll suggest a learning path based on your goal.`,

            career: `Let's talk career. 

I can help you explore careers in:

• Frontend / Web Design
• UI/UX & Product Design
• Game Development

Tell me which one interests you most.`,

            explain: `What would you like me to explain? 📚

You can ask me about HTML, CSS, JavaScript, React, UI/UX, design systems, game engines, game mechanics, or other topics related to your learning.`,

            summary: `Sure! 📖

Tell me the topic you'd like summarized.

For example:
• Responsive Web Design
• UX Design
• Product Discovery
• Game Mechanics
• JavaScript
• Design Systems`
        };

        return {
            id: Date.now(),
            role: "ai",
            text: messages[mode],
        };
    };

    const [messages, setMessages] = useState<AIMessage[]>([
        getInitialMessage(mode)
    ]);

    useEffect(() => {

        setMessages([
            getInitialMessage(mode)
        ]);

    }, [mode]);




    const [input, setInput] = useState("");

    const [loading, setLoading] = useState(false);


    const generateResponse = (
    question: string,
    currentMode: AIMode
): string => {

    const text = question.toLowerCase();

    if (currentMode === "quiz") {
        return `
Let's test your knowledge! 🧠

Here's your question:

Which CSS layout system is best suited for arranging elements in two dimensions?

A. Flexbox
B. CSS Grid
C. HTML
D. JavaScript

Reply with A, B, C, or D.
        `;
    }

    if (currentMode === "recommend") {
        return `
Based on what you've told me, I'd recommend starting with...

...
        `;
    }

    if (currentMode === "career") {
        return `
Let's look at this from a career perspective...

...
        `;
    }

    // your existing topic detection continues here


        // =====================================================
        // WEB DESIGN
        // =====================================================

        if (
            text.includes("html") ||
            text.includes("semantic html") ||
            text.includes("html tag")
        ) {

            return `
HTML provides the structure of a webpage.

Think of it as the skeleton of a website.

Important HTML concepts include:

• Semantic HTML
• Headings
• Paragraphs
• Links
• Images
• Forms
• Tables
• Lists
• Accessibility

For example:

<h1>My Portfolio</h1>

creates a main page heading.

A good web designer should understand semantic HTML because it improves accessibility, SEO, and maintainability.
        `;
        }


        if (
            text.includes("css") ||
            text.includes("flexbox") ||
            text.includes("grid") ||
            text.includes("responsive")
        ) {

            return `
CSS controls how a website looks and behaves visually.

Important areas to master include:

• Flexbox
• CSS Grid
• Responsive design
• Typography
• Spacing
• Colors
• Positioning
• Transitions
• Animations

For responsive design, don't design only for one screen size.

Think in terms of:

Mobile → Tablet → Desktop

Your layout should adapt naturally between them.
        `;
        }


        if (
            text.includes("javascript") ||
            text.includes("react") ||
            text.includes("typescript") ||
            text.includes("frontend")
        ) {

            return `
For modern web development, I'd recommend learning these in roughly this order:

1. HTML
2. CSS
3. JavaScript
4. Git & GitHub
5. APIs
6. React
7. TypeScript
8. Authentication
9. State management
10. Deployment

Don't just study the syntax.

Build projects while learning.

For example, build a dashboard, authentication system, LMS, e-commerce site, or portfolio.
        `;
        }


        if (
            text.includes("api") ||
            text.includes("rest") ||
            text.includes("axios")
        ) {

            return `
An API allows your frontend application to communicate with a backend.

A typical flow looks like:

User
↓
React application
↓
Axios / fetch
↓
API endpoint
↓
Backend
↓
Database

For example:

GET /student/courses

could retrieve the courses belonging to a student.

When working with APIs, learn:

• GET
• POST
• PUT/PATCH
• DELETE
• HTTP status codes
• Authentication
• Authorization
• Error handling
        `;
        }


        // =====================================================
        // PRODUCT DESIGN
        // =====================================================

        if (
            text.includes("product design") ||
            text.includes("product designer")
        ) {

            return `
Product design is about solving problems for users while also creating something useful for the business.

A typical product design process looks like:

1. Understand the problem
2. Research users
3. Define the problem
4. Generate ideas
5. Create wireframes
6. Design the interface
7. Prototype
8. Test with users
9. Iterate
10. Work with developers to build it

Good product design isn't just about making something beautiful.

It's about making the right thing easy to use.
        `;
        }


        if (
            text.includes("ux") ||
            text.includes("user experience")
        ) {

            return `
UX design focuses on the user's experience when interacting with a product.

Important UX principles include:

• Clarity
• Consistency
• Feedback
• Accessibility
• Simplicity
• Information hierarchy
• Error prevention

A useful question to ask when designing any interface is:

"What does the user need to accomplish here?"

Start with the user's goal before deciding what the interface should look like.
        `;
        }


        if (
            text.includes("ui") ||
            text.includes("user interface")
        ) {

            return `
UI design focuses on the visual interface of a product.

Important areas include:

• Typography
• Color
• Spacing
• Layout
• Components
• Icons
• Visual hierarchy
• Interaction states

A strong UI should make the product's structure obvious.

Users shouldn't have to guess what is clickable, what is important, or what happens next.
        `;
        }


        if (
            text.includes("wireframe") ||
            text.includes("prototype")
        ) {

            return `
A wireframe is a simplified representation of an interface.

It focuses on:

• Layout
• Content hierarchy
• Navigation
• User flow

A prototype goes further by allowing users to interact with the design.

A good workflow is:

Problem
↓
User flow
↓
Wireframe
↓
High-fidelity UI
↓
Prototype
↓
User testing
↓
Iteration
        `;
        }


        if (
            text.includes("design system") ||
            text.includes("component library")
        ) {

            return `
A design system is a collection of reusable design decisions and components.

It can include:

• Colors
• Typography
• Spacing
• Buttons
• Inputs
• Cards
• Navigation
• Icons
• Interaction states

The goal is consistency.

Instead of designing every button from scratch, you create reusable components that behave consistently across the product.
        `;
        }


        // =====================================================
        // GAME DEVELOPMENT
        // =====================================================

        if (
            text.includes("game development") ||
            text.includes("game dev") ||
            text.includes("game developer")
        ) {

            return `
Game development combines several disciplines:

• Programming
• Game design
• Art
• Animation
• Audio
• Level design
• Storytelling
• User experience

A simple game development workflow is:

Idea
↓
Game mechanics
↓
Prototype
↓
Core gameplay
↓
Levels/content
↓
Testing
↓
Polish
↓
Release

Don't start by trying to build a huge game.

Build a very small playable game first.
        `;
        }


        if (
            text.includes("game mechanic") ||
            text.includes("mechanics")
        ) {

            return `
Game mechanics are the rules and systems that define how a game works.

Examples include:

• Jumping
• Shooting
• Health
• Inventory
• Scoring
• Movement
• Combat
• Crafting
• Progression

For example, in a platformer:

Input
↓
Player presses jump
↓
Character receives upward velocity
↓
Gravity pulls character downward
↓
Character lands

Good game mechanics should be understandable, responsive, and fun to interact with.
        `;
        }


        if (
            text.includes("unity") ||
            text.includes("unreal") ||
            text.includes("godot")
        ) {

            return `
Popular game engines include:

Unity
• Strong for 2D and 3D
• Uses C#
• Large ecosystem

Unreal Engine
• Excellent for high-end 3D
• Uses C++ and Blueprints
• Strong visual tools

Godot
• Open source
• Lightweight
• Excellent for indie development
• Uses GDScript, C#, and other options

For a beginner, the best engine is usually the one you can consistently build projects with.

Don't spend months choosing an engine without actually making a game.
        `;
        }


        // =====================================================
        // QUIZ
        // =====================================================

        if (
            text.includes("quiz") ||
            text.includes("test me")
        ) {

            return `
Let's test your knowledge! 🧠

Which technology is primarily responsible for controlling the visual presentation of a webpage?

A. HTML

B. CSS

C. JavaScript

D. Python

Reply with A, B, C, or D.
        `;
        }


        // =====================================================
        // SUMMARY
        // =====================================================

        if (
            text.includes("summarize") ||
            text.includes("summary")
        ) {

            return `
Here's a quick summary of the three major learning areas:

WEB DESIGN
HTML → Structure
CSS → Presentation
JavaScript → Behaviour
React → Interfaces

PRODUCT DESIGN
Research → Problem → Wireframe → UI → Prototype → Test

GAME DEVELOPMENT
Concept → Mechanics → Prototype → Gameplay → Levels → Polish

The three fields overlap more than you might think.

All three require understanding users, designing experiences, solving problems, and iterating based on feedback.
        `;
        }


        // =====================================================
        // CAREER
        // =====================================================

        if (
            text.includes("career") ||
            text.includes("job") ||
            text.includes("interview")
        ) {

            return `
There are several career paths you can explore:

WEB DESIGN
• Frontend Developer
• Web Designer
• React Developer
• UI Developer

PRODUCT DESIGN
• UI Designer
• UX Designer
• Product Designer
• UX Researcher

GAME DEVELOPMENT
• Gameplay Programmer
• Game Designer
• Technical Artist
• Level Designer

Whatever path you choose, build a portfolio.

Projects demonstrate your ability much better than simply listing technologies you've studied.
        `;
        }


        // =====================================================
        // RECOMMENDATION
        // =====================================================

        if (
            text.includes("what should") ||
            text.includes("study next") ||
            text.includes("learn next") ||
            text.includes("recommend")
        ) {

            return `
Here's a simple learning roadmap:

WEB DESIGN
HTML → CSS → JavaScript → React → TypeScript → APIs

PRODUCT DESIGN
UX fundamentals → Research → Wireframes → UI → Prototypes → Design Systems

GAME DEVELOPMENT
Programming → Game mechanics → Engine → Prototyping → Level design → Polish

Pick one primary path and use the others as supporting skills.

For example, a web developer who understands product design can build better interfaces.
        `;
        }


        // =====================================================
        // DEFAULT
        // =====================================================

        return `


I currently specialize in helping you learn:

🌐 Web Design
🎨 Product Design
🎮 Game Development

Try asking me something like:

"Explain responsive design"

"What is a design system?"

"How do game mechanics work?"

"Should I learn React or TypeScript next?"

"What is UX design?"

"Quiz me on JavaScript"

"How do I become a product designer?"
    `;
    };


    const sendMessage = async () => {

        const trimmedMessage =
            input.trim();

        if (!trimmedMessage || loading) {
            return;
        }


        const userMessage: AIMessage = {
            id: Date.now(),
            role: "user",
            text: trimmedMessage,
        };


        setMessages(prev => [
            ...prev,
            userMessage,
        ]);

        setInput("");

        setLoading(true);


        // Simulate AI thinking

        setTimeout(() => {

            const response =
                generateResponse(trimmedMessage, mode);


            const aiMessage: AIMessage = {
                id: Date.now() + 1,
                role: "ai",
                text: response,
            };


            setMessages(prev => [
                ...prev,
                aiMessage,
            ]);

            setLoading(false);

        }, 800);

    };


    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>
    ) => {

        if (e.key === "Enter") {
            sendMessage();
        }

    };


    return (

        <div className="flex min-h-[calc(100vh-80px)] flex-col">

            {/* HEADER */}

            <div className="border-b border-gray-100 bg-white px-6 py-5">

                <h1 className="text-2xl font-semibold text-gray-900">
                    AI Learning Assistant
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                    Your personal learning companion
                </p>

            </div>


            {/* CHAT */}

            <div className="flex-1 overflow-y-auto bg-[#f7f7fb] px-4 py-8">

                <div className="mx-auto max-w-4xl space-y-5">

                    {messages.map(message => (

                        <div
                            key={message.id}
                            className={`flex items-end gap-3 ${message.role === "user"
                                    ? "justify-end"
                                    : "justify-start"
                                }`}
                        >
                            {/* AI ICON */}
                            {message.role === "ai" && (
                                <div className="flex h-30 w-30 shrink-0 items-center justify-center rounded-full ">
                                    <img
                                        src={merry}
                                        alt="Merry"
                                        className="h-30 w-30 object-contain"
                                    />
                                </div>
                            )}

                            {/* MESSAGE */}
                            <div
                                className={`max-w-[80%] rounded-2xl px-5 py-4 text-sm leading-6 ${message.role === "user"
                                        ? "rounded-br-md bg-vercity text-white"
                                        : "rounded-bl-md bg-white text-gray-700 shadow-sm"
                                    }`}
                            >
                                {message.text}
                            </div>
                        </div>

                    ))}


                    {loading && (

                        <div className="flex justify-start">

                            <div className="rounded-2xl bg-white px-5 py-4 shadow-sm">

                                <div className="flex gap-1">

                                    <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400" />

                                    <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:150ms]" />

                                    <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:300ms]" />

                                </div>

                            </div>

                        </div>

                    )}

                </div>

            </div>


            {/* INPUT */}

            <div className="border-t border-gray-100 bg-white p-4">

                <div className="mx-auto flex max-w-4xl gap-3">

                    <input
                        value={input}
                        onChange={e =>
                            setInput(e.target.value)
                        }
                        onKeyDown={handleKeyDown}
                        placeholder="Ask Merry anything..."
                        className="flex-1 rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-vercity"
                    />

                    <button
                        onClick={sendMessage}
                        disabled={!input.trim() || loading}
                        className="rounded-xl bg-vercity px-6 py-3 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        Send
                    </button>

                </div>

            </div>

        </div>

    );
};

export default AIAssistant;
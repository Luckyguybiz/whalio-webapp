/* Whalio - Lessons Data */
const LESSONS_DATA = {
  chatgpt: {
    name: "ChatGPT Mastery", icon: "💬", description: "Master conversational AI",
    lessons: [
      { id: "chatgpt-1", title: "Introduction to ChatGPT", free: true, steps: [
        { type: "text", title: "What is ChatGPT?", content: "<h2>What is ChatGPT?</h2><p>ChatGPT is an AI language model by OpenAI that understands and generates human-like text. It can help with writing, coding, analysis, and creative tasks.</p><p>In this course you will learn to use ChatGPT effectively for work, business and personal projects.</p>" },
        { type: "text", title: "How It Works", content: "<h2>How ChatGPT Works</h2><p>ChatGPT uses a transformer architecture trained on vast text data. It predicts the next word to create coherent, contextual responses.</p><p><strong>Key concepts:</strong> Natural Language Processing, context understanding, token-based generation.</p>" },
        { type: "text", title: "Getting Started", content: "<h2>Getting Started</h2><p>1. Visit chat.openai.com<br>2. Create a free account<br>3. Start a new conversation<br>4. Type your first prompt</p><p>Free version uses GPT-3.5, Plus gives GPT-4.</p>" },
        { type: "quiz", title: "Quick Check", content: "<h2>Quick Check</h2><p>What is ChatGPT primarily used for?</p>", options: ["Image generation","Text generation and conversation","Video editing","Music composition"], correct: 1 }
      ]},
      { id: "chatgpt-2", title: "Writing Effective Prompts", free: true, steps: [
        { type: "text", title: "The Art of Prompting", content: "<h2>The Art of Prompting</h2><p>The quality of ChatGPT output depends entirely on your prompts. A well-crafted prompt leads to accurate, useful responses.</p>" },
        { type: "text", title: "Prompt Structure", content: "<h2>Prompt Structure</h2><p>An effective prompt has: <strong>Role</strong> (who to be), <strong>Task</strong> (what to do), <strong>Context</strong> (background info), <strong>Format</strong> (how you want output).</p>" },
        { type: "text", title: "Examples", content: "<h2>Prompt Examples</h2><p><strong>Bad:</strong> Write about marketing.</p><p><strong>Good:</strong> Act as a digital marketing expert. Write a 500-word blog post about email marketing strategies for small e-commerce businesses. Include 3 actionable tips with examples. Use a conversational tone.</p>" },
        { type: "quiz", title: "Quick Check", content: "<h2>Quick Check</h2><p>Which element is NOT part of a good prompt structure?</p>", options: ["Role definition","Random keywords","Clear task description","Output format"], correct: 1 }
      ]},
      { id: "chatgpt-3", title: "ChatGPT for Business", free: false, steps: [
        { type: "text", title: "Business Applications", content: "<h2>ChatGPT for Business</h2><p>Transform your work with AI: email drafting, content creation, data analysis, customer support automation, and research summarization.</p>" },
        { type: "text", title: "Email Templates", content: "<h2>Email Templates</h2><p>Use ChatGPT to draft professional emails in seconds. Specify tone, audience, and purpose for perfect results every time.</p>" },
        { type: "text", title: "Content Marketing", content: "<h2>Content Marketing with AI</h2><p>Generate blog posts, social media content, newsletters, and ad copy. Maintain a consistent content calendar with minimal effort.</p>" },
        { type: "quiz", title: "Quick Check", content: "<h2>Quick Check</h2><p>What is a key benefit of using ChatGPT for business?</p>", options: ["It replaces all employees","It speeds up content and communication tasks","It guarantees sales","It eliminates all errors"], correct: 1 }
      ]},
      { id: "chatgpt-4", title: "Advanced Techniques", free: false, steps: [
        { type: "text", title: "Chain-of-Thought", content: "<h2>Chain-of-Thought Prompting</h2><p>Ask ChatGPT to think step by step for complex problems. This dramatically improves accuracy for math, logic, and analysis tasks.</p>" },
        { type: "text", title: "Few-Shot Learning", content: "<h2>Few-Shot Learning</h2><p>Provide examples of what you want before asking for output. This trains ChatGPT on your exact style and format requirements.</p>" },
        { type: "text", title: "Custom Instructions", content: "<h2>Custom Instructions</h2><p>Use custom instructions to set persistent context. ChatGPT will remember your preferences across all conversations.</p>" },
        { type: "quiz", title: "Final Quiz", content: "<h2>Final Quiz</h2><p>What technique involves providing examples before your request?</p>", options: ["Zero-shot","Few-shot learning","Chain prompting","Recursive generation"], correct: 1 }
      ]},
      { id: "chatgpt-5", title: "Monetizing ChatGPT Skills", free: false, steps: [
        { type: "text", title: "Income Opportunities", content: "<h2>Making Money with ChatGPT</h2><p>Your ChatGPT skills are valuable: freelance content writing, AI consulting, creating and selling prompts, building AI-powered products, teaching others about AI.</p>" },
        { type: "text", title: "Freelancing", content: "<h2>AI-Powered Freelancing</h2><p>Platforms like Upwork and Fiverr have seen a surge in AI-related services. Offer: AI content creation, prompt engineering, chatbot development.</p>" },
        { type: "text", title: "Building Products", content: "<h2>Building AI Products</h2><p>Combine ChatGPT API with simple tools: automated email responders, content generators, customer support bots, educational tools.</p>" },
        { type: "quiz", title: "Final Quiz", content: "<h2>Module Complete!</h2><p>What is NOT a common way to monetize ChatGPT skills?</p>", options: ["Freelance writing","AI consulting","Prompt selling","Hardware manufacturing"], correct: 3 }
      ]}
    ]
  },
  midjourney: {
    name: "Midjourney Mastery", icon: "🎨", description: "Create stunning AI art and visuals",
    lessons: [
      { id: "mj-1", title: "Getting Started with Midjourney", free: true, steps: [
        { type: "text", title: "What is Midjourney?", content: "<h2>What is Midjourney?</h2><p>Midjourney is an AI image generation tool that creates stunning visuals from text descriptions. Used by artists, designers, and marketers worldwide.</p>" },
        { type: "text", title: "Setting Up", content: "<h2>Setting Up Midjourney</h2><p>1. Join the Midjourney Discord server<br>2. Subscribe to a plan<br>3. Use the /imagine command<br>4. Describe what you want to create</p>" },
        { type: "text", title: "Your First Image", content: "<h2>Creating Your First Image</h2><p>Type: /imagine prompt: a beautiful sunset over mountains, digital art style</p><p>Midjourney generates 4 variations. Upscale (U1-U4) or create variations (V1-V4).</p>" },
        { type: "quiz", title: "Quick Check", content: "<h2>Quick Check</h2><p>What command starts image generation?</p>", options: ["/create","/imagine","/generate","/draw"], correct: 1 }
      ]},
      { id: "mj-2", title: "Prompt Engineering for Art", free: true, steps: [
        { type: "text", title: "Prompt Anatomy", content: "<h2>Anatomy of a Midjourney Prompt</h2><p>Subject + Style + Lighting + Camera + Mood + Details = Great image.</p>" },
        { type: "text", title: "Style Keywords", content: "<h2>Powerful Style Keywords</h2><p>photorealistic, watercolor, oil painting, digital art, anime, cyberpunk, minimalist, vintage, isometric, 3D render.</p>" },
        { type: "text", title: "Parameters", content: "<h2>Midjourney Parameters</h2><p>--ar 16:9 (aspect ratio), --v 6 (version), --s 750 (stylize level), --q 2 (quality).</p>" },
        { type: "quiz", title: "Quick Check", content: "<h2>Quick Check</h2><p>What parameter controls the aspect ratio?</p>", options: ["--size","--ar","--ratio","--dim"], correct: 1 }
      ]},
      { id: "mj-3", title: "Advanced Midjourney", free: false, steps: [
        { type: "text", title: "Image Blending", content: "<h2>Image Blending</h2><p>Combine multiple reference images using /blend. Upload 2-5 images and Midjourney merges their styles.</p>" },
        { type: "text", title: "Remix Mode", content: "<h2>Remix Mode</h2><p>Enable Remix to modify prompts when creating variations. Fine-grained control over image evolution.</p>" },
        { type: "text", title: "Consistency", content: "<h2>Creating Consistent Characters</h2><p>Use seed values and detailed descriptions for character consistency across generations.</p>" },
        { type: "quiz", title: "Quick Check", content: "<h2>Quick Check</h2><p>What command blends images?</p>", options: ["/mix","/combine","/blend","/merge"], correct: 2 }
      ]},
      { id: "mj-4", title: "Monetizing AI Art", free: false, steps: [
        { type: "text", title: "Selling AI Art", content: "<h2>Monetizing Your AI Art</h2><p>Sell prints on Etsy, create stock images, offer design services, build brand assets, create social media content.</p>" },
        { type: "text", title: "Platforms", content: "<h2>Where to Sell</h2><p>Best platforms: Etsy, Redbubble, Society6, Adobe Stock, Shutterstock, Fiverr, and your own website.</p>" },
        { type: "text", title: "Pricing", content: "<h2>Pricing Your Work</h2><p>Digital downloads: $5-25. Custom commissions: $50-500. Brand packages: $200-2000.</p>" },
        { type: "quiz", title: "Final Quiz", content: "<h2>Module Complete!</h2><p>Popular platform for AI art prints?</p>", options: ["GitHub","Etsy","LinkedIn","Slack"], correct: 1 }
      ]}
    ]
  },
  jasper: {
    name: "Jasper AI Essentials", icon: "✍️", description: "AI-powered writing and content creation",
    lessons: [
      { id: "jasper-1", title: "Introduction to Jasper AI", free: true, steps: [
        { type: "text", title: "What is Jasper?", content: "<h2>What is Jasper AI?</h2><p>Professional writing assistant for marketing teams. Create blog posts, ads, emails, and social media content at scale.</p>" },
        { type: "text", title: "Key Features", content: "<h2>Key Features</h2><p>Brand Voice customization, 50+ content templates, long-form editor, SEO integration, team collaboration.</p>" },
        { type: "text", title: "Getting Started", content: "<h2>Getting Started</h2><p>Create account at jasper.ai, choose plan, set up brand voice, start generating content.</p>" },
        { type: "quiz", title: "Quick Check", content: "<h2>Quick Check</h2><p>What is Jasper designed for?</p>", options: ["Image editing","Marketing content creation","Video production","Data analysis"], correct: 1 }
      ]},
      { id: "jasper-2", title: "Jasper Templates", free: true, steps: [
        { type: "text", title: "Templates Overview", content: "<h2>Jasper Templates</h2><p>50+ templates: AIDA framework, PAS framework, blog outlines, product descriptions, email subject lines.</p>" },
        { type: "text", title: "Best Templates", content: "<h2>Most Powerful Templates</h2><p>Blog Post Outline, Content Improver, Sentence Expander, Facebook Ad Copy, Email Subject Lines.</p>" },
        { type: "text", title: "Using Templates", content: "<h2>How to Use Templates</h2><p>Select template, fill inputs (product, tone, audience), click Generate, review and edit output.</p>" },
        { type: "quiz", title: "Quick Check", content: "<h2>Quick Check</h2><p>How many templates does Jasper offer?</p>", options: ["10+","25+","50+","100+"], correct: 2 }
      ]},
      { id: "jasper-3", title: "Advanced Jasper Workflows", free: false, steps: [
        { type: "text", title: "Brand Voice", content: "<h2>Setting Up Brand Voice</h2><p>Train Jasper on your brand voice. Upload content, define tone, maintain consistency across outputs.</p>" },
        { type: "text", title: "SEO Content", content: "<h2>SEO-Optimized Content</h2><p>Surfer SEO integration: keyword suggestions, optimal word count, content structure for rankings.</p>" },
        { type: "text", title: "Team Workflows", content: "<h2>Team Collaboration</h2><p>Team workspaces, shared brand voices, content campaigns, approval workflows.</p>" },
        { type: "quiz", title: "Final Quiz", content: "<h2>Module Complete!</h2><p>What integration helps SEO in Jasper?</p>", options: ["Google Ads","Surfer SEO","Mailchimp","Canva"], correct: 1 }
      ]}
    ]
  },
  dalle: {
    name: "DALL-E Essentials", icon: "🖼️", description: "Generate amazing images with AI",
    lessons: [
      { id: "dalle-1", title: "Introduction to DALL-E", free: true, steps: [
        { type: "text", title: "What is DALL-E?", content: "<h2>What is DALL-E?</h2><p>OpenAI image generation model. Creates images from text, edits existing images. Integrated directly into ChatGPT Plus.</p>" },
        { type: "text", title: "Capabilities", content: "<h2>What DALL-E Can Do</h2><p>Generate images from text, edit and modify images, create variations, extend images (outpainting), remove/add elements (inpainting).</p>" },
        { type: "text", title: "First Image", content: "<h2>Creating Your First Image</h2><p>In ChatGPT, describe what you want with specifics about style, colors, and composition.</p>" },
        { type: "quiz", title: "Quick Check", content: "<h2>Quick Check</h2><p>What is DALL-E integrated into?</p>", options: ["Instagram","ChatGPT Plus","Microsoft Word","Adobe Photoshop"], correct: 1 }
      ]},
      { id: "dalle-2", title: "DALL-E Prompting Techniques", free: true, steps: [
        { type: "text", title: "Effective Prompts", content: "<h2>Writing Effective DALL-E Prompts</h2><p>Be specific about: Subject, Style, Color palette, Composition, Lighting, and Mood. More detail = better results.</p>" },
        { type: "text", title: "Style Guide", content: "<h2>Style Keywords for DALL-E</h2><p>watercolor, oil painting, digital illustration, photorealistic, pixel art, isometric, flat design, minimalist, retro, neon.</p>" },
        { type: "text", title: "Common Mistakes", content: "<h2>Avoid These Mistakes</h2><p>Don't be too vague, don't overload with details, avoid contradictory descriptions.</p>" },
        { type: "quiz", title: "Quick Check", content: "<h2>Quick Check</h2><p>What leads to better DALL-E results?</p>", options: ["Short vague prompts","Specific detailed descriptions","Single word prompts","Random keywords"], correct: 1 }
      ]},
      { id: "dalle-3", title: "DALL-E for Business", free: false, steps: [
        { type: "text", title: "Business Use Cases", content: "<h2>DALL-E for Business</h2><p>Product mockups, social media graphics, blog illustrations, presentation visuals, logo concepts, marketing materials.</p>" },
        { type: "text", title: "Workflow", content: "<h2>Professional Workflow</h2><p>Generate concepts with DALL-E, refine with editing tools, apply brand colors, export in the right format.</p>" },
        { type: "text", title: "Monetizing", content: "<h2>Making Money with DALL-E</h2><p>Graphic design services, stock images, visual content packages, print-on-demand products.</p>" },
        { type: "quiz", title: "Final Quiz", content: "<h2>Module Complete!</h2><p>What is a practical business use of DALL-E?</p>", options: ["Code debugging","Product mockups and marketing visuals","Database management","Server maintenance"], correct: 1 }
      ]}
    ]
  }
};

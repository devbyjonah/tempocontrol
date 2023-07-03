# Next Metronome

An online metronome application that allows users to sign in, create presets, and practice with the accuracy and precision required by professional musicians.

## How It's Made:

**Tech used:** NextJS, ReactJS, Typescript, Web Audio API, Next Auth, and TailwindCSS

I built this application using NextJS 13 to experiment with some of the cutting edge features such as React server components, the new app directory, and the optimized Image and Link components. Additionally, I utilized Typescript to ensure type safety and increase the readability of the codebase. The web audio API ensures that the metronome is accurate and precise even while handling other tasks. TailwindCSS has allowed me to quickly style components without having to create many CSS classes and adding many css modules to my directory. Next Auth handles the authentication for the application and makes it extremely easy to include various methods of auth such as google 0Auth and other external providers. It also handles the creation of a session and stores the user/session data in my mongoDB database with very little configuration.

## Optimizations

I have many features and optimizations planned for this app so be sure to keep an eye out if intersted. The largest feature I have planned is the ability for the user to create presets where they can decide how many measures they want the metronome to play, the tempo it should play at, as well as subdivision and accent options. For example, a user could create a warmup preset that plays 4 bars of 4/4 at 120bpm followed by 4 bars of 4/4 at 140bpm and so on. This would allow the user to create presets that follow with their warmup/practice routines as well as any song/piece that they are working on.

## Lessons Learned:

I have learned so much already while working on this project, and I expect that it will continue to help me grow as a developer. Some of my biggest takeaways: - NextJS is an extremely powerful framework that allows you to build powerful applications quickly and efficiently - Typescript is a great tool to ensure type safety and increase the readability of your code - TailwindCSS and it's utility first approach allows me to quickly style components and increase productivity greatly - The web audio API is a powerful tool that allows you to create complex audio applications with ease. In addition passing off complex and precise operations to external workers can be helpful when creating large web applications to avoid potential blocking issues. - Finally Next Auth is a huge time saver, handling all aspects of authentication and session management for your application. It also allows you to easily add various authentication providers such as google 0Auth and other external providers.

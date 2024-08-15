import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export function randomUrl(): string {
  return Math.random().toString(16).slice(2);
};

// Get random time starting from now and going back one day whenever 
// database is seeded in future
export function randomDate(): string {
  // this is set to one day
  const offset = 24 * 60 * 60 * 1000 * 1;
  
  const current = new Date().getTime();
  const random = Math.random() * offset;
  const difference = new Date(current - random);

  return difference.toISOString();
};

function getUsers() {
  return [
    {
      name: 'chara',
      handle: '@charapyge',
      email: 'charapyge@gmail.com',
      avatar: '/profile/chara/avatar.jpg',
      about: 'Likes reading manga and watching anime',
      tweets: {
        create: [
          {
            url: randomUrl(),
            posted: randomDate(),
            content: `Sveltekit is lit. 🔥`,
            likes: 10,
          },
          {
            url: randomUrl(),
            posted: randomDate(),
            content: `I love Svelte! ❤️`,
            likes: 24,
          },
          {
            url: randomUrl(),
            posted: randomDate(),
            content: `I'm just testing out Sveltekit. 🤓`,
            likes: 8,
          },
          {
            url: randomUrl(),
            posted: randomDate(),
            content: `How do you comfort a JavaScript bug? You console it. 🤭`,
            likes: 0,
          }
        ]
      },
    },
    {
      name: 'bob',
      handle: '@bobross',
      email: 'bob@example.test',
      avatar: '/profile/bob/avatar.jpg',
      about: 'Likes painting',
      tweets: {
        create: [
          {
            url: randomUrl(),
            posted: randomDate(),
            content: `Use your imagination. Wind it up, blend it together. The joy of paining really is universal. 🎨`,
            likes: 3,
          },
          {
            url: randomUrl(),
            posted: randomDate(),
            content: `The only thing I have control over is taking out the trash. 🎨`,
            likes: 5,
          },
          {
            url: randomUrl(),
            posted: randomDate(),
            content: `Painting is as individual as people are. 🎨`,
            likes: 16,
          },
          {
            url: randomUrl(),
            posted: randomDate(),
            content: `All we do is just sorta have an idea in our mind, and we just sorta let it happen. 🌈`,
            likes: 8
          },
        ]
      },
    },
  ]
};

async function seed() {
  const users = getUsers();

  for (const user of users) {
    await prisma.user.create({ data: user });
  }
};

seed();

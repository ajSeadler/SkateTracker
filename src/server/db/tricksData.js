const tricksData = [
  {
    trick_id: 1,
    name: "Ollie",
    description:
      "A fundamental skateboarding trick where the rider leaps into the air without grabbing the skateboard.",
    difficulty_level: "Beginner",
    category: "Flatground",
  },
  {
    trick_id: 2,
    name: "Kickflip",
    description:
      "A trick where the skateboarder flips the board 360 degrees along the axis running from the nose to the tail.",
    difficulty_level: "Intermediate",
    category: "Flatground",
  },
  {
    trick_id: 3,
    name: "Heelflip",
    description:
      "Similar to a kickflip but the skateboarder flips the board in the opposite direction using the heel.",
    difficulty_level: "Intermediate",
    category: "Flatground",
  },
  {
    trick_id: 4,
    name: "Shuvit",
    description:
      "A trick where the skateboard is spun 180 degrees while the rider stays in the same position.",
    difficulty_level: "Beginner",
    category: "Flatground",
  },
  {
    trick_id: 5,
    name: "Pop Shuvit",
    description:
      "An advanced version of the Shuvit, where the board is popped into the air before spinning.",
    difficulty_level: "Intermediate",
    category: "Flatground",
  },
  {
    trick_id: 6,
    name: "Manual",
    description:
      "A trick where the rider balances on two wheels of the skateboard while riding.",
    difficulty_level: "Beginner",
    category: "Flatground",
  },
  {
    trick_id: 7,
    name: "Nose Manual",
    description:
      "Similar to a manual but with the rider balancing on the front two wheels.",
    difficulty_level: "Intermediate",
    category: "Flatground",
  },
  {
    trick_id: 8,
    name: "Varial Kickflip",
    description:
      "A combination of a kickflip and a shuvit, where the board flips and spins simultaneously.",
    difficulty_level: "Advanced",
    category: "Flatground",
  },
  {
    trick_id: 9,
    name: "Hardflip",
    description:
      "A trick where the board flips in a vertical 360-degree motion while also spinning 180 degrees horizontally.",
    difficulty_level: "Advanced",
    category: "Flatground",
  },
  {
    trick_id: 10,
    name: "Tre Flip",
    description:
      "Also known as a 360 flip, this trick combines a kickflip with a 360-degree shuvit.",
    difficulty_level: "Advanced",
    category: "Flatground",
  },
  {
    trick_id: 11,
    name: "Laser Flip",
    description:
      "A combination of a heelflip and a 360-degree frontside shuvit. It's one of the most difficult flatground tricks.",
    difficulty_level: "Expert",
    category: "Flatground",
  },
  {
    trick_id: 12,
    name: "Impossible",
    description:
      "A trick where the board wraps around the back foot in a 360-degree motion. It's known for its unique vertical spin.",
    difficulty_level: "Advanced",
    category: "Flatground",
  },
  {
    trick_id: 13,
    name: "Bigspin",
    description:
      "A combination of a 360-degree shuvit and a 180-degree body rotation in the same direction.",
    difficulty_level: "Advanced",
    category: "Flatground",
  },
  {
    trick_id: 14,
    name: "360 Hardflip",
    description:
      "A hardflip combined with a 360-degree rotation of the board. Extremely difficult and requires great skill.",
    difficulty_level: "Expert",
    category: "Flatground",
  },
  {
    trick_id: 15,
    name: "Inward Heelflip",
    description:
      "A combination of a heelflip and a backside shuvit, where the board spins inward and flips simultaneously.",
    difficulty_level: "Advanced",
    category: "Flatground",
  },
  {
    trick_id: 16,
    name: "Nollie Flip",
    description:
      "A trick where the rider performs a kickflip from a nollie stance (nose ollie).",
    difficulty_level: "Advanced",
    category: "Flatground",
  },
  {
    trick_id: 17,
    name: "Switch Tre Flip",
    description:
      "A tre flip performed in switch stance (riding with the opposite foot forward).",
    difficulty_level: "Expert",
    category: "Flatground",
  },
  {
    trick_id: 18,
    name: "Darkslide",
    description:
      "A grind performed on the griptape side of the skateboard, sliding across an obstacle.",
    difficulty_level: "Expert",
    category: "Grinds",
  },
  {
    trick_id: 19,
    name: "Smith Grind",
    description:
      "A grind where the front truck slides on the ledge or rail while the back truck is over the obstacle.",
    difficulty_level: "Intermediate",
    category: "Grinds",
  },
  {
    trick_id: 20,
    name: "Feeble Grind",
    description:
      "A grind where the front truck slides on the ledge or rail while the back truck is angled inward, giving a more technical appearance.",
    difficulty_level: "Advanced",
    category: "Grinds",
  },
  {
    trick_id: 21,
    name: "Noseblunt Slide",
    description:
      "A trick where the front truck slides on the ledge or rail while the nose of the board is angled downward.",
    difficulty_level: "Expert",
    category: "Grinds",
  },
  {
    trick_id: 22,
    name: "Blunt Slide",
    description:
      "A trick where the back truck slides on the ledge or rail while the nose of the board is angled downward.",
    difficulty_level: "Advanced",
    category: "Grinds",
  },
  {
    trick_id: 23,
    name: "K grind",
    description:
      "A grind where the board slides on a ledge or rail with the back truck catching on the obstacle.",
    difficulty_level: "Intermediate",
    category: "Grinds",
  },

  {
    trick_id: 33,
    name: "Ginger Grind",
    description:
      "A more technical grind where the front truck slides on the ledge or rail while the back truck is lifted and rotated.",
    difficulty_level: "Advanced",
    category: "Grinds",
  },
  {
    trick_id: 32,
    name: "Crooked Grind",
    description:
      "A grind where the front truck slides on the ledge or rail at an angle, while the back truck is off the obstacle.",
    difficulty_level: "Beginner",
    category: "Grinds",
  },
  {
    trick_id: 34,
    name: "Tailslide",
    description:
      "A grind where the tail of the board slides along the ledge or rail while the front of the board is lifted.",
    difficulty_level: "Advanced",
    category: "Grinds",
  },

  {
    trick_id: 30,
    name: "50-50 Grind",
    description:
      "A basic grind where both trucks slide along a ledge or rail, with the board parallel to the obstacle.",
    difficulty_level: "Beginner",
    category: "Grinds",
  },

  // New Transition Tricks
  {
    trick_id: 24,
    name: "Rock to Fakie",
    description:
      "A transition trick where the rider rocks the board on the coping and then lands in the fakie stance.",
    difficulty_level: "Beginner",
    category: "Transition",
  },
  {
    trick_id: 25,
    name: "Mute Grab",
    description:
      "A grab where the rider grabs the board with the front hand while in the air over a transition.",
    difficulty_level: "Intermediate",
    category: "Transition",
  },
  {
    trick_id: 26,
    name: "Method Grab",
    description:
      "A grab where the rider grabs the board with the front hand and tweaks the board in mid-air for style.",
    difficulty_level: "Advanced",
    category: "Transition",
  },
  {
    trick_id: 27,
    name: "Stalefish Grab",
    description:
      "A grab where the rider grabs the board with the back hand while in the air over a transition.",
    difficulty_level: "Intermediate",
    category: "Transition",
  },
  {
    trick_id: 28,
    name: "McTwist",
    description:
      "A 540-degree spin combined with a method grab, performed in the air over a transition.",
    difficulty_level: "Expert",
    category: "Transition",
  },
  {
    trick_id: 29,
    name: "Dropping-In",
    description:
      "A fundamental transition trick where the skater positions the tail of the board on the coping, leans forward, and rides smoothly down the transition.",
    difficulty_level: "Beginner",
    category: "Transition",
  },

 
];

module.exports = tricksData;

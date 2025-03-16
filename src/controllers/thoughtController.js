import Thought from '../models/Thought.js';

// Get all thoughts
export const getThoughts = async (/** @type {any} */ req, /** @type {{ json: (arg0: (import("mongoose").Document<unknown, {}, { createdAt: NativeDate; updatedAt: NativeDate; } & { text: string; createdAt: NativeDate; username: string; reactions: import("mongoose").Types.DocumentArray<{ createdAt: NativeDate; username?: string | null; reactionBody?: string | null; }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, { createdAt: NativeDate; username?: string | null; reactionBody?: string | null; }> & { createdAt: NativeDate; username?: string | null; reactionBody?: string | null; }>; }> & { createdAt: NativeDate; updatedAt: NativeDate; } & { text: string; createdAt: NativeDate; username: string; reactions: import("mongoose").Types.DocumentArray<{ createdAt: NativeDate; username?: string | null; reactionBody?: string | null; }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, { createdAt: NativeDate; username?: string | null; reactionBody?: string | null; }> & { createdAt: NativeDate; username?: string | null; reactionBody?: string | null; }>; } & { _id: import("mongoose").Types.ObjectId; } & { __v: number; })[]) => void; status: (arg0: number) => { (): any; new (): any; json: { (arg0: { error: any; }): void; new (): any; }; }; }} */ res) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    // @ts-ignore
    res.status(500).json({ error: err.message });
  }
};

// Create a new thought
export const createThought = async (/** @type {{ body: any; }} */ req, /** @type {{ json: (arg0: import("mongoose").Document<unknown, {}, { createdAt: NativeDate; updatedAt: NativeDate; } & { text: string; createdAt: NativeDate; username: string; reactions: import("mongoose").Types.DocumentArray<{ createdAt: NativeDate; username?: string | null; reactionBody?: string | null; }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, { createdAt: NativeDate; username?: string | null; reactionBody?: string | null; }> & { createdAt: NativeDate; username?: string | null; reactionBody?: string | null; }>; }> & { createdAt: NativeDate; updatedAt: NativeDate; } & { text: string; createdAt: NativeDate; username: string; reactions: import("mongoose").Types.DocumentArray<{ createdAt: NativeDate; username?: string | null; reactionBody?: string | null; }, import("mongoose").Types.Subdocument<import("mongoose").Types.ObjectId, any, { createdAt: NativeDate; username?: string | null; reactionBody?: string | null; }> & { createdAt: NativeDate; username?: string | null; reactionBody?: string | null; }>; } & { _id: import("mongoose").Types.ObjectId; } & { __v: number; }) => void; status: (arg0: number) => { (): any; new (): any; json: { (arg0: { error: any; }): void; new (): any; }; }; }} */ res) => {
  try {
    const newThought = await Thought.create(req.body);
    res.json(newThought);
  } catch (err) {
    // @ts-ignore
    res.status(500).json({ error: err.message });
  }
};

// Delete a thought
export const deleteThought = async (/** @type {{ params: { thoughtId: any; }; }} */ req, /** @type {{ status: (arg0: number) => { (): any; new (): any; json: { (arg0: { message?: string; error?: any; }): void; new (): any; }; }; json: (arg0: { message: string; }) => void; }} */ res) => {
  try {
    const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
    if (!thought) return res.status(404).json({ message: 'Thought not found' });
    res.json({ message: 'Thought deleted' });
  } catch (err) {
    // @ts-ignore
    res.status(500).json({ error: err.message });
  }
};

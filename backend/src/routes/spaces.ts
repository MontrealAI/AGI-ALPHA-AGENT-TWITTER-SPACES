import { Router, Request, Response } from 'express';
import { createSpaceSession, getSessionStatus, endSpaceSession } from '../services/agiAgentService';

const router = Router();

// Endpoint to create a new Twitter Space session (premium access required)
router.post('/create', async (req: Request, res: Response) => {
  try {
    const { title, scheduledTime } = req.body;
    const session = await createSpaceSession(title, scheduledTime);
    res.status(201).json({ success: true, session });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Endpoint to get the status of a session by session ID
router.get('/:sessionId', async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;
    const session = await getSessionStatus(sessionId);
    res.json({ success: true, session });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Endpoint to end an active session
router.post('/:sessionId/end', async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;
    await endSpaceSession(sessionId);
    res.json({ success: true, message: 'Session ended successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;

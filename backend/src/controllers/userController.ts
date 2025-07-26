import { Response } from 'express';
import { createClient } from '@supabase/supabase-js';
import { AuthenticatedRequest } from '../middleware/auth';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = supabaseUrl && supabaseServiceKey 
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null;

export const getUserProfile = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    if (!supabase) {
      // Mode développement - retourner des données mock
      return res.json({
        user_id: req.user.id,
        email: req.user.email,
        subscription: {
          status: 'free_trial',
          trial_end_date: null,
          stripe_customer_id: null
        },
        trial_topic: null,
        created_at: new Date().toISOString()
      });
    }

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('user_id', req.user.id)
      .single();

    if (error) {
      console.error('Error fetching user profile:', error);
      return res.status(500).json({ error: 'Failed to fetch user profile' });
    }

    res.json(data);
  } catch (error) {
    console.error('Get user profile error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateUserProfile = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const { subscription, trial_topic } = req.body;

    if (!supabase) {
      // Mode développement - simuler la mise à jour
      return res.json({
        user_id: req.user.id,
        email: req.user.email,
        subscription: subscription || {
          status: 'free_trial',
          trial_end_date: null,
          stripe_customer_id: null
        },
        trial_topic: trial_topic || null,
        created_at: new Date().toISOString()
      });
    }

    const updateData: any = {};
    if (subscription) updateData.subscription = subscription;
    if (trial_topic !== undefined) updateData.trial_topic = trial_topic;

    const { data, error } = await supabase
      .from('users')
      .update(updateData)
      .eq('user_id', req.user.id)
      .select()
      .single();

    if (error) {
      console.error('Error updating user profile:', error);
      return res.status(500).json({ error: 'Failed to update user profile' });
    }

    res.json(data);
  } catch (error) {
    console.error('Update user profile error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateTrialTopic = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const { topic } = req.body;

    if (!topic) {
      return res.status(400).json({ error: 'Topic is required' });
    }

    if (!supabase) {
      // Mode développement
      return res.json({
        user_id: req.user.id,
        trial_topic: topic,
        updated_at: new Date().toISOString()
      });
    }

    const { data, error } = await supabase
      .from('users')
      .update({ trial_topic: topic })
      .eq('user_id', req.user.id)
      .select('user_id, trial_topic')
      .single();

    if (error) {
      console.error('Error updating trial topic:', error);
      return res.status(500).json({ error: 'Failed to update trial topic' });
    }

    res.json(data);
  } catch (error) {
    console.error('Update trial topic error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
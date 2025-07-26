import { Response } from 'express';
import { createClient } from '@supabase/supabase-js';
import { AuthenticatedRequest } from '../middleware/auth';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = supabaseUrl && supabaseServiceKey 
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null;

export const getUserDogs = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    if (!supabase) {
      // Mode développement - retourner des données mock
      return res.json([
        {
          dog_id: 'mock-dog-1',
          owner_id: req.user.id,
          name: 'Rocky',
          breed: 'Berger Australien',
          date_of_birth: '2023-06-15',
          background: 'Adopté au refuge',
          health_issues: 'Aucun problème connu',
          photo_url: null,
          created_at: new Date().toISOString()
        }
      ]);
    }

    const { data, error } = await supabase
      .from('dogs')
      .select('*')
      .eq('owner_id', req.user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching dogs:', error);
      return res.status(500).json({ error: 'Failed to fetch dogs' });
    }

    res.json(data || []);
  } catch (error) {
    console.error('Get user dogs error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createDog = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const { name, breed, date_of_birth, background, health_issues, photo_url } = req.body;

    // Validation
    if (!name || !breed) {
      return res.status(400).json({ 
        error: 'Name and breed are required' 
      });
    }

    if (!supabase) {
      // Mode développement
      const mockDog = {
        dog_id: `mock-dog-${Date.now()}`,
        owner_id: req.user.id,
        name,
        breed,
        date_of_birth: date_of_birth || null,
        background: background || '',
        health_issues: health_issues || '',
        photo_url: photo_url || null,
        created_at: new Date().toISOString()
      };
      return res.status(201).json(mockDog);
    }

    const { data, error } = await supabase
      .from('dogs')
      .insert({
        owner_id: req.user.id,
        name,
        breed,
        date_of_birth: date_of_birth || null,
        background: background || '',
        health_issues: health_issues || '',
        photo_url: photo_url || null
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating dog:', error);
      return res.status(500).json({ error: 'Failed to create dog profile' });
    }

    res.status(201).json(data);
  } catch (error) {
    console.error('Create dog error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateDog = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const { dogId } = req.params;
    const { name, breed, date_of_birth, background, health_issues, photo_url } = req.body;

    if (!dogId) {
      return res.status(400).json({ error: 'Dog ID is required' });
    }

    if (!supabase) {
      // Mode développement
      const mockDog = {
        dog_id: dogId,
        owner_id: req.user.id,
        name: name || 'Rocky',
        breed: breed || 'Berger Australien',
        date_of_birth: date_of_birth || null,
        background: background || '',
        health_issues: health_issues || '',
        photo_url: photo_url || null,
        created_at: new Date().toISOString()
      };
      return res.json(mockDog);
    }

    // Vérifier que le chien appartient à l'utilisateur
    const { data: existingDog, error: fetchError } = await supabase
      .from('dogs')
      .select('owner_id')
      .eq('dog_id', dogId)
      .single();

    if (fetchError || !existingDog) {
      return res.status(404).json({ error: 'Dog not found' });
    }

    if (existingDog.owner_id !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to update this dog' });
    }

    const updateData: any = {};
    if (name) updateData.name = name;
    if (breed) updateData.breed = breed;
    if (date_of_birth !== undefined) updateData.date_of_birth = date_of_birth;
    if (background !== undefined) updateData.background = background;
    if (health_issues !== undefined) updateData.health_issues = health_issues;
    if (photo_url !== undefined) updateData.photo_url = photo_url;

    const { data, error } = await supabase
      .from('dogs')
      .update(updateData)
      .eq('dog_id', dogId)
      .select()
      .single();

    if (error) {
      console.error('Error updating dog:', error);
      return res.status(500).json({ error: 'Failed to update dog profile' });
    }

    res.json(data);
  } catch (error) {
    console.error('Update dog error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteDog = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const { dogId } = req.params;

    if (!dogId) {
      return res.status(400).json({ error: 'Dog ID is required' });
    }

    if (!supabase) {
      // Mode développement
      return res.json({ message: 'Dog deleted successfully' });
    }

    // Vérifier que le chien appartient à l'utilisateur
    const { data: existingDog, error: fetchError } = await supabase
      .from('dogs')
      .select('owner_id')
      .eq('dog_id', dogId)
      .single();

    if (fetchError || !existingDog) {
      return res.status(404).json({ error: 'Dog not found' });
    }

    if (existingDog.owner_id !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to delete this dog' });
    }

    const { error } = await supabase
      .from('dogs')
      .delete()
      .eq('dog_id', dogId);

    if (error) {
      console.error('Error deleting dog:', error);
      return res.status(500).json({ error: 'Failed to delete dog profile' });
    }

    res.json({ message: 'Dog deleted successfully' });
  } catch (error) {
    console.error('Delete dog error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
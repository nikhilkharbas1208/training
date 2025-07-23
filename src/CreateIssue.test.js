
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import JiraContext from './JiraContext';
import CreateIssue from './JiraIntegrate/CreateIssue';


const mockContext = { userData: { auth: 'fakeAuthToken' } };

beforeEach(() => {
  jest.clearAllMocks();
});

test('shows form and submits with correct payload and response', async () => {

      const fakeResponse = { key: 'JIR-123' };
      jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        json: async () => fakeResponse,
      });

      render(
        <JiraContext.Provider value={mockContext}>
          <CreateIssue />
        </JiraContext.Provider>
      );

      fireEvent.change(screen.getByLabelText(/Project Key/i), {
        target: { value: 'JIR' }
      });
      fireEvent.change(screen.getByLabelText(/Issue Type/i), {
        target: { value: 'Task' }
      });
      fireEvent.change(screen.getByLabelText(/Summary/i), {
        target: { value: 'Test summary' }
      });
      fireEvent.change(screen.getByLabelText(/Description/i), {
        target: { value: 'Test description' }
      });


      fireEvent.click(screen.getByRole('button', { name: /Create Task/i }));


    await waitFor(() => 
      expect(global.fetch).toHaveBeenCalledWith(
        '/rest/api/3/issue',
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            Authorization: `Basic ${mockContext.userData.auth}`,
            'Content-Type': 'application/json',
          }),
        })
      )
    );

    const [, opts] = global.fetch.mock.calls[0];
    const bodyObj = JSON.parse(opts.body);

    expect(bodyObj).toEqual({
      fields: {
        project: { key: 'JIR' },
        issuetype: { name: 'Task' },
        summary: 'Test summary',
        description: {
          type: 'doc',
          version: 1,
          content: [
            {
              type: 'paragraph',
              content: [{ type: 'text', text: 'Test description' }],
            }
          ],
        },
      },
    });


      expect(await screen.findByText(/Created issue JIR-123/)).toBeInTheDocument();
});

import React from 'react';
import { Card, Button } from 'antd';
import 'antd/dist/reset.css';

const ClaimSeverity = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50">
      {/* Train Data Section */}
      <div className="w-full max-w-md mb-4">
      <p className="text-center text-purple-600 mt-2">Train Data</p>
        <Card bordered={true} className="border-purple-600">
          <div className="bg-blue-900 text-white p-4 text-center rounded">
            Adj R²– 90%
          </div>
        </Card>
      
      </div>

      {/* Test Data Section */}
      <div className="w-full max-w-md mb-6">
        <Card bordered={true} className="border-blue-600">
          <div className="border border-blue-600 text-blue-600 p-4 text-center rounded">
            Adj R²– 90%
          </div>
        </Card>
        <p className="text-center text-blue-600 mt-2">Test Data</p>
      </div>

      {/* Save & Publish Button */}
      <Button type="primary" size="large" shape="round" className="bg-blue-700 hover:bg-blue-800 text-white">
        Save & Publish
      </Button>
    </div>
  );
};

export default ClaimSeverity;

'use client';

import { ResponsiveLine } from '@nivo/line';
import { useMemo } from 'react';

interface RevenueData {
  metric_date: string;
  metric_value: number;
}

interface MonthlyRevenueChartProps {
  data: RevenueData[];
}

export default function MonthlyRevenueChart({ data }: MonthlyRevenueChartProps) {
  const chartData = useMemo(() => {
    // Format data for Nivo line chart
    const formattedData = data.map((item) => ({
      x: new Date(item.metric_date).toLocaleDateString('en-US', { 
        month: 'short', 
        year: 'numeric' 
      }),
      y: item.metric_value
    }));

    // If no data, show empty state with sample structure
    if (formattedData.length === 0) {
      const currentDate = new Date();
      const emptyData = [];
      for (let i = 11; i >= 0; i--) {
        const date = new Date(currentDate);
        date.setMonth(date.getMonth() - i);
        emptyData.push({
          x: date.toLocaleDateString('en-US', { 
            month: 'short', 
            year: 'numeric' 
          }),
          y: 0
        });
      }
      return [{
        id: 'revenue',
        color: 'hsl(220, 70%, 50%)',
        data: emptyData
      }];
    }

    return [{
      id: 'revenue',
      color: 'hsl(220, 70%, 50%)',
      data: formattedData
    }];
  }, [data]);

  const maxValue = useMemo(() => {
    const values = data.map(d => d.metric_value);
    return values.length > 0 ? Math.max(...values) * 1.1 : 10000;
  }, [data]);

  return (
    <div style={{ height: '300px' }}>
      <ResponsiveLine
        data={chartData}
        margin={{ top: 20, right: 30, bottom: 60, left: 80 }}
        xScale={{ type: 'point' }}
        yScale={{
          type: 'linear',
          min: 0,
          max: maxValue,
          stacked: false,
          reverse: false
        }}
        yFormat=" >-$,.0f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: -45,
          legend: 'Month',
          legendOffset: 50,
          legendPosition: 'middle'
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Revenue ($)',
          legendOffset: -60,
          legendPosition: 'middle',
          format: '>-$,.0f'
        }}
        pointSize={8}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        enableGridX={false}
        enableGridY={true}
        curve="monotoneX"
        lineWidth={3}
        colors={{ scheme: 'category10' }}
        theme={{
          axis: {
            domain: {
              line: {
                stroke: '#e5e7eb',
                strokeWidth: 1
              }
            },
            ticks: {
              line: {
                stroke: '#e5e7eb',
                strokeWidth: 1
              },
              text: {
                fill: '#6b7280',
                fontSize: 12
              }
            },
            legend: {
              text: {
                fill: '#374151',
                fontSize: 12,
                fontWeight: 600
              }
            }
          },
          grid: {
            line: {
              stroke: '#f3f4f6',
              strokeWidth: 1
            }
          },
          tooltip: {
            container: {
              background: '#ffffff',
              color: '#374151',
              fontSize: 12,
              borderRadius: 6,
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
            }
          }
        }}
        tooltip={({ point }) => (
          <div className="bg-white px-3 py-2 shadow-lg rounded-md border border-gray-200">
            <div className="text-sm font-medium text-gray-900">
              {point.data.xFormatted}
            </div>
            <div className="text-sm text-gray-600">
              Revenue: ${point.data.yFormatted}
            </div>
          </div>
        )}
      />
    </div>
  );
}
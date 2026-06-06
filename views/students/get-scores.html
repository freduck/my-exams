<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Student Scores</title>
    <style>
        /* Basic Page Styling */
        .container { padding: 20px; font-family: sans-serif; }

        /* Modal Overlay Styling */
        .modal-overlay {
            display: none; /* Hidden by default */
            position: fixed;
            top: 0; left: 0;
            width: 100%; height: 100%;
            background: rgba(0,0,0,0.5);
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }

        .modal-content {
            background: white;
            padding: 20px;
            border-radius: 8px;
            max-width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            position: relative;
        }

        #close-modal {
            position: absolute;
            top: 10px;
            right: 15px;
            cursor: pointer;
            border: none;
            background: none;
            font-size: 24px;
        }
        
        /* Table Styling */
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { padding: 12px; border: 1px solid #ddd; text-align: left; }
        th { background-color: #f4f4f4; }
    </style>
</head>
<body>

<div class="container">
    <input type="text" name="name" id="name" placeholder="Enter Student Name">
    <button type="button" id="get-scores">Get Scores</button>
</div>

<div id="modal-overlay" class="modal-overlay">
    <div class="modal-content">
        <button id="close-modal">&times;</button>
        <table id="result-table">
            <thead>
                <tr>
                    <th>Subject</th>
                    <th>Total Questions</th>
                    <th>Score</th>
                    <th>Type</th>
                    <th>Percentage</th>
                </tr>
            </thead>
            <tbody id="result-body">
                </tbody>
        </table>
    </div>
</div>

<script>
    document.addEventListener('DOMContentLoaded', () => {
        const overlay = document.getElementById('modal-overlay');
        const resultBody = document.getElementById('result-body');
        const btn = document.getElementById('get-scores');
        const closeBtn = document.getElementById('close-modal');

        btn.addEventListener('click', async function() {
            let name = document.getElementById('name').value;
            if (!name) return alert("Please enter a name");

            try {
                let response = await fetch('/get-score', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: name })
                });
                
                let result = await response.json();
                
                // Clear previous results
                resultBody.innerHTML = '';
                
                // Populate new results
                result.score.forEach(el => {
                    let row = `<tr>
                        <td>${el.subject}</td>
                        <td>${el.totalQuestions}</td>
                        <td>${el.score}</td>
                        <td>${el.type}</td>
                        <td>${el.percentage}%</td>
                    </tr>`;
                    resultBody.innerHTML += row;
                });

                // Show Modal
                overlay.style.display = 'flex';
            } catch (err) {
                console.error("Error fetching data:", err);
                alert("Failed to fetch data. Ensure your server is running.");
            }
        });

        // Close functionality
        closeBtn.onclick = () => overlay.style.display = 'none';
        window.onclick = (event) => { if (event.target == overlay) overlay.style.display = 'none'; };
    });
</script>

</body>
</html>

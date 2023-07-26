using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Database.Migrations
{
    /// <inheritdoc />
    public partial class InitDB : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Moodle",
                columns: table => new
                {
                    IdMoodle = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Moodle", x => x.IdMoodle);
                });

            migrationBuilder.CreateTable(
                name: "User",
                columns: table => new
                {
                    IdUser = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.IdUser);
                });

            migrationBuilder.CreateTable(
                name: "Complement",
                columns: table => new
                {
                    IdComplement = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Reference = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    URL = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Type = table.Column<int>(type: "int", nullable: false),
                    IdMoodle = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Complement", x => x.IdComplement);
                    table.ForeignKey(
                        name: "FK_Complement_Moodle_IdMoodle",
                        column: x => x.IdMoodle,
                        principalTable: "Moodle",
                        principalColumn: "IdMoodle",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Topic",
                columns: table => new
                {
                    IdTopic = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false),
                    IdMoodle = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Topic", x => x.IdTopic);
                    table.ForeignKey(
                        name: "FK_Topic_Moodle_IdMoodle",
                        column: x => x.IdMoodle,
                        principalTable: "Moodle",
                        principalColumn: "IdMoodle",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "User_Moodle",
                columns: table => new
                {
                    IdUser_Moodle = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdMoodle = table.Column<int>(type: "int", nullable: false),
                    IdUser = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User_Moodle", x => x.IdUser_Moodle);
                    table.ForeignKey(
                        name: "FK_User_Moodle_Moodle_IdMoodle",
                        column: x => x.IdMoodle,
                        principalTable: "Moodle",
                        principalColumn: "IdMoodle",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_User_Moodle_User_IdUser",
                        column: x => x.IdUser,
                        principalTable: "User",
                        principalColumn: "IdUser",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Concept",
                columns: table => new
                {
                    IdConcept = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IdTopic = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Concept", x => x.IdConcept);
                    table.ForeignKey(
                        name: "FK_Concept_Topic_IdTopic",
                        column: x => x.IdTopic,
                        principalTable: "Topic",
                        principalColumn: "IdTopic",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Evaluation",
                columns: table => new
                {
                    IdEvaluation = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Status = table.Column<bool>(type: "bit", nullable: false),
                    IdTopic = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Evaluation", x => x.IdEvaluation);
                    table.ForeignKey(
                        name: "FK_Evaluation_Topic_IdTopic",
                        column: x => x.IdTopic,
                        principalTable: "Topic",
                        principalColumn: "IdTopic",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Example",
                columns: table => new
                {
                    IdExample = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Reference = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    URL = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Type = table.Column<int>(type: "int", nullable: false),
                    IdTopic = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Example", x => x.IdExample);
                    table.ForeignKey(
                        name: "FK_Example_Topic_IdTopic",
                        column: x => x.IdTopic,
                        principalTable: "Topic",
                        principalColumn: "IdTopic",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Question",
                columns: table => new
                {
                    IdQuestion = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false),
                    Type = table.Column<int>(type: "int", nullable: false),
                    IdEvaluation = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Question", x => x.IdQuestion);
                    table.ForeignKey(
                        name: "FK_Question_Evaluation_IdEvaluation",
                        column: x => x.IdEvaluation,
                        principalTable: "Evaluation",
                        principalColumn: "IdEvaluation",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "User_Evaluation",
                columns: table => new
                {
                    IdUser_Evaluation = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdEvaluation = table.Column<int>(type: "int", nullable: false),
                    IdUser = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User_Evaluation", x => x.IdUser_Evaluation);
                    table.ForeignKey(
                        name: "FK_User_Evaluation_Evaluation_IdEvaluation",
                        column: x => x.IdEvaluation,
                        principalTable: "Evaluation",
                        principalColumn: "IdEvaluation",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_User_Evaluation_User_IdUser",
                        column: x => x.IdUser,
                        principalTable: "User",
                        principalColumn: "IdUser",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Answer",
                columns: table => new
                {
                    IdAnswer = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OrderAnswer = table.Column<int>(type: "int", nullable: false),
                    IsCorrect = table.Column<bool>(type: "bit", nullable: false),
                    IdQuestion = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Answer", x => x.IdAnswer);
                    table.ForeignKey(
                        name: "FK_Answer_Question_IdQuestion",
                        column: x => x.IdQuestion,
                        principalTable: "Question",
                        principalColumn: "IdQuestion",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Answer_IdQuestion",
                table: "Answer",
                column: "IdQuestion");

            migrationBuilder.CreateIndex(
                name: "IX_Complement_IdMoodle",
                table: "Complement",
                column: "IdMoodle");

            migrationBuilder.CreateIndex(
                name: "IX_Concept_IdTopic",
                table: "Concept",
                column: "IdTopic");

            migrationBuilder.CreateIndex(
                name: "IX_Evaluation_IdTopic",
                table: "Evaluation",
                column: "IdTopic");

            migrationBuilder.CreateIndex(
                name: "IX_Example_IdTopic",
                table: "Example",
                column: "IdTopic");

            migrationBuilder.CreateIndex(
                name: "IX_Question_IdEvaluation",
                table: "Question",
                column: "IdEvaluation");

            migrationBuilder.CreateIndex(
                name: "IX_Topic_IdMoodle",
                table: "Topic",
                column: "IdMoodle");

            migrationBuilder.CreateIndex(
                name: "IX_User_Evaluation_IdEvaluation",
                table: "User_Evaluation",
                column: "IdEvaluation");

            migrationBuilder.CreateIndex(
                name: "IX_User_Evaluation_IdUser",
                table: "User_Evaluation",
                column: "IdUser");

            migrationBuilder.CreateIndex(
                name: "IX_User_Moodle_IdMoodle",
                table: "User_Moodle",
                column: "IdMoodle");

            migrationBuilder.CreateIndex(
                name: "IX_User_Moodle_IdUser",
                table: "User_Moodle",
                column: "IdUser");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Answer");

            migrationBuilder.DropTable(
                name: "Complement");

            migrationBuilder.DropTable(
                name: "Concept");

            migrationBuilder.DropTable(
                name: "Example");

            migrationBuilder.DropTable(
                name: "User_Evaluation");

            migrationBuilder.DropTable(
                name: "User_Moodle");

            migrationBuilder.DropTable(
                name: "Question");

            migrationBuilder.DropTable(
                name: "User");

            migrationBuilder.DropTable(
                name: "Evaluation");

            migrationBuilder.DropTable(
                name: "Topic");

            migrationBuilder.DropTable(
                name: "Moodle");
        }
    }
}
